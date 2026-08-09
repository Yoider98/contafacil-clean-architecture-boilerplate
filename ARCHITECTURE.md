# 📘 SaaS Backend — Guía Completa de Arquitectura

> **Para quién es este documento:** Desarrolladores que se unen al proyecto, revisores técnicos o cualquier persona que quiera entender cómo está construida esta API desde cero.

---

## 🚀 ¿Qué es este proyecto?

Es el **backend de una plataforma SaaS** (Software as a Service) que permite a múltiples empresas gestionar su negocio desde una sola API. Cada empresa tiene sus propios usuarios, productos, inventario, ventas, compras y cuentas contables — completamente aislados entre sí.

**Tecnologías usadas:**
| Tecnología | Rol |
|---|---|
| **Node.js + TypeScript** | Lenguaje y runtime |
| **LoopBack 4** | Framework REST |
| **PostgreSQL** | Base de datos relacional |
| **UUID v4** | Generación de IDs únicos |

---

## 🏗️ La Arquitectura — Clean Architecture / DDD

Este proyecto no está organizado por "tipo de archivo" (como controllers/, models/, etc.) sino por **capas de responsabilidad**. Esto se llama **Domain-Driven Design (DDD)** y es el estándar en aplicaciones empresariales serias.

```
┌──────────────────────────────────────────────┐
│             PRESENTATION (HTTP)              │  ← El cliente habla aquí
│         Controllers / REST Endpoints         │
├──────────────────────────────────────────────┤
│              APPLICATION                     │  ← La lógica de negocio
│              Use Cases                       │
├──────────────────────────────────────────────┤
│               DOMAIN                         │  ← Las reglas del negocio
│         Entities / Interfaces                │
├──────────────────────────────────────────────┤
│            INFRASTRUCTURE                    │  ← El mundo real (BD, APIs)
│     Models / Mappers / Repositories          │
└──────────────────────────────────────────────┘
```

**¿Por qué esta arquitectura?**
- 🔒 El **Dominio** nunca depende de la base de datos. Si mañana cambias de PostgreSQL a MongoDB, solo cambias la capa de infraestructura.
- 🧪 Los **Use Cases** son 100% testeables sin necesidad de una BD real.
- 👥 Múltiples desarrolladores pueden trabajar en paralelo en capas distintas sin conflictos.

---

## 📁 Estructura Completa de Carpetas

```
saas-backend/
├── src/
│   ├── domain/           ← Las reglas del negocio (el corazón)
│   ├── application/      ← Los casos de uso (la lógica)
│   ├── infrastructure/   ← La conexión con PostgreSQL
│   ├── presentation/     ← Los endpoints REST (lo que ve el cliente)
│   ├── application.ts    ← Punto de arranque de LoopBack
│   ├── index.ts          ← Entrada principal de Node.js
│   └── migrate.ts        ← Script de migraciones de BD
│
├── database/
│   └── database.sql      ← Schema completo de PostgreSQL
│
└── postman/
    └── SaaS_Backend_API.postman_collection.json
```

---

## 🧠 CAPA 1: DOMAIN — El corazón del sistema

> **¿Qué es?** La capa de dominio contiene las **reglas de negocio puras**. No sabe nada de HTTP, ni de PostgreSQL, ni de LoopBack. Es TypeScript puro.

### `src/domain/shared/domain.entity.ts`
La **clase base** de la que heredan TODAS las entidades del sistema.

```typescript
export class DomainEntity {
    id?: string;       // UUID único
    companyId: string; // A qué empresa pertenece (multi-tenancy)
}
```

> 💡 **Por qué existe:** Cada objeto de negocio pertenece a una empresa (`companyId`). Esto garantiza que una empresa nunca vea datos de otra.

---

### Módulo: Empresas (`domain/companies/`)

```
companies/
├── entities/
│   └── company.entity.ts     ← Representa una empresa
└── repositories/
    └── company.repository.interface.ts  ← Contrato de qué se puede hacer
```

**`company.entity.ts`** — Una empresa tiene:
- `id` → UUID único
- `name` → Nombre de la empresa
- `plan` → Plan contratado (FREE, PRO, ENTERPRISE)
- `createdAt` → Fecha de creación

**`company.repository.interface.ts`** — Define el *contrato*:
```typescript
interface ICompanyRepository {
    create(company: Company): Promise<Company>;
    findById(id: string): Promise<Company>;
    findAll(): Promise<Company[]>;
}
```
> 💡 Es solo una **interfaz** (un contrato). Dice *qué* se puede hacer, pero **no cómo**. El *cómo* lo define la capa de Infraestructura.

---

### Módulo: Usuarios (`domain/users/`)

```
users/
├── entities/
│   └── user.entity.ts
├── enums/
│   └── user-role.enum.ts     ← OWNER | ADMIN | SELLER
└── repositories/
    └── user.repository.interface.ts
```

**`user-role.enum.ts`** — Los tres roles del sistema:
| Rol | Significado |
|---|---|
| `OWNER` | Dueño de la empresa (se crea al registrar la compañía) |
| `ADMIN` | Administrador — acceso total |
| `SELLER` | Gestionador — acceso a ventas y compras |

**`user.entity.ts`** — Un usuario tiene:
- `companyId` → A qué empresa pertenece
- `name`, `email` → Datos personales
- `role` → Uno de los 3 roles

---

### Módulo: Inventario (`domain/inventory/`)

```
inventory/
├── entities/
│   ├── product.entity.ts           ← Un producto
│   ├── warehouse.entity.ts         ← Un almacén
│   ├── inventory-movement.entity.ts ← Un movimiento de stock
│   └── inventory-stock.entity.ts   ← Stock calculado
├── enums/
│   └── movement-type.enum.ts       ← IN | OUT | ADJUST
└── repositories/
    └── inventory.repository.interface.ts
```

**Concepto clave:** El stock **no se guarda directamente** en ninguna tabla. Se **calcula** sumando todos los movimientos:

```
Stock actual = Σ(movimientos IN) - Σ(movimientos OUT) + Σ(ajustes)
```

Esto da una **trazabilidad total**: siempre se sabe qué pasó con cada unidad. 

**`movement-type.enum.ts`:**
- `IN` → Ingresa mercancía (compra, devolución)
- `OUT` → Sale mercancía (venta)
- `ADJUST` → Ajuste manual de inventario

---

### Módulo: Ventas (`domain/sales/`)

```
sales/
├── entities/
│   ├── sales.entity.ts      ← Cabecera de la venta
│   └── sales-item.entity.ts ← Línea de la venta (un producto)
└── repositories/
    └── sales.repository.interface.ts
```

Una venta (`Sales`) tiene: `companyId`, `paymentMethod`, `total`, `createdAt`.
Cada línea (`SalesItem`) tiene: `salesId`, `productId`, `quantity`, `price`.

---

### Módulo: Compras (`domain/purchases/`)
Similar a Ventas pero al revés: entra mercancía y se registra un movimiento **IN** automático.

### Módulo: Contabilidad (`domain/accounting/`)
```
accounting/
├── entities/
│   ├── account.entity.ts      ← Una cuenta contable
│   └── ledger-entry.entity.ts ← Un asiento contable
├── enums/
│   └── account-type.enum.ts   ← INCOME | EXPENSE | COST
└── repositories/
    └── accounting.repository.interface.ts
```

---

## ⚙️ CAPA 2: APPLICATION — Los Casos de Uso

> **¿Qué es?** Aquí vive **toda la lógica de negocio**. Un caso de uso describe una acción completa que el sistema puede realizar (ej: "crear una venta").

```
application/
├── companies/use-cases/
│   └── create-company.use-case.ts
├── users/use-cases/
│   └── create-user.use-case.ts
├── inventory/use-cases/
│   ├── create-product.use-case.ts
│   ├── register-movement.use-case.ts
│   └── get-stock.use-case.ts
├── purchases/use-cases/
│   └── create-purchase.use-case.ts   ← ⭐ Registra stock IN automático
├── sales/use-cases/
│   └── create-sales.use-case.ts      ← ⭐ Valida stock y registra OUT
└── accounting/use-cases/
    ├── create-account.use-case.ts
    └── create-ledger-entry.use-case.ts
```

### ⭐ Ejemplo: `create-sales.use-case.ts`

Este es el uso más complejo. Al crear una venta, ocurre en orden:

```
1. Validar que companyId, warehouseId e items existen
       ↓
2. Para cada producto:
   → Consultar stock actual en `inventory_movements`
   → Si stock < quantity: lanzar error (422)
       ↓
3. Calcular total = Σ(price × quantity)
       ↓
4. Guardar en tabla `sales`
       ↓
5. Guardar cada línea en tabla `sale_items`
       ↓
6. Registrar movimiento OUT en `inventory_movements`
```

### ⭐ Ejemplo: `create-purchase.use-case.ts`

```
1. Validar campos obligatorios
       ↓
2. Calcular total = Σ(cost × quantity)
       ↓
3. Guardar en tabla `purchases`
       ↓
4. Guardar cada línea en `purchase_items`
       ↓
5. Registrar movimiento IN en `inventory_movements`  ← Stock aumenta
```

> 💡 **El inventario siempre se actualiza automáticamente.** No hay que llamar a otro endpoint.

---

## 🔌 CAPA 3: INFRASTRUCTURE — La Conexión con PostgreSQL

> **¿Qué es?** Esta capa implementa los contratos definidos en el Dominio. Aquí está el código que realmente habla con la base de datos.

```
infrastructure/
├── database/datasources/
│   └── postgres.datasource.ts  ← Configuración de la conexión a PostgreSQL
│
├── companies/
│   ├── models/company.model.ts          ← Mapa de la tabla SQL
│   ├── mappers/company.mapper.ts        ← Convierte entre dominio ↔ BD
│   └── repositories/company.repository.ts ← Implementa ICompanyRepository
│
├── users/          (misma estructura)
├── inventory/      (misma estructura)
├── purchases/      (misma estructura)
├── sales/          (misma estructura)
└── accounting/     (misma estructura)
```

### `postgres.datasource.ts`
Lee las variables de entorno (`.env`) y establece la conexión con PostgreSQL:
```
DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
```

### Los 3 archivos que trabajan juntos en cada módulo:

```
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│     MODEL       │     │     MAPPER        │     │   REPOSITORY     │
│                 │     │                  │     │                  │
│ Define cómo es  │────▶│ Traduce entity   │────▶│ Ejecuta el       │
│ la tabla en BD  │     │ ↔ model          │     │ INSERT/SELECT    │
│                 │     │                  │     │                  │
│ SalesModel.ts   │     │ SalesMapper.ts   │     │ SalesRepository  │
└─────────────────┘     └──────────────────┘     └──────────────────┘
```

#### `company.model.ts` — El mapa de la tabla SQL
```typescript
@model({ settings: { postgresql: { table: 'companies' } } })
export class CompanyModel extends Entity {
    @property({ id: true, generated: false }) id: string;
    @property() name: string;
    @property() plan: string;
}
```
> LoopBack lee este archivo y sabe exactamente a qué columna de PostgreSQL corresponde cada propiedad.

#### `company.mapper.ts` — El traductor
```
Domain Entity (Company) ──toPersistence──▶ CompanyModel (para guardar en BD)
CompanyModel            ──toDomain──────▶ Domain Entity (para devolver al cliente)
```
También asigna el UUID automáticamente si el objeto es nuevo.

#### `company.repository.ts` — El que ejecuta las consultas
Implementa la interfaz del dominio usando `DefaultCrudRepository` de LoopBack:
```typescript
async create(company: Company): Promise<Company> {
    const model = CompanyMapper.toPersistence(company); // Domain → Model
    const saved = await this.lbRepository.create(model); // INSERT en BD
    return CompanyMapper.toDomain(saved);                // Model → Domain
}
```

---

## 🌐 CAPA 4: PRESENTATION — Los Endpoints REST

> **¿Qué es?** Los controladores exponen la API HTTP. Reciben requests, invocan el Use Case correspondiente y devuelven la respuesta.

```
presentation/
├── companies/controllers/companies.controller.ts
├── users/controllers/users.controller.ts
├── inventory/controllers/
│   ├── product.controller.ts
│   └── inventory.controller.ts
├── purchases/controllers/purchases.controller.ts
├── sales/controllers/sales.controller.ts
└── accounting/controllers/accounting.controller.ts
```

### Tabla de todos los endpoints

| Módulo | Método | Ruta | Acción |
|--------|--------|------|--------|
| **Empresas** | POST | `/companies` | Crear empresa |
| | GET | `/companies` | Listar empresas |
| | GET | `/companies/{id}` | Ver empresa |
| **Usuarios** | POST | `/users` | Crear usuario |
| | GET | `/users?companyId=` | Usuarios de empresa |
| | GET | `/users/{id}` | Ver usuario |
| **Productos** | POST | `/products` | Crear producto |
| **Inventario** | POST | `/inventory/movements` | Registrar movimiento |
| | GET | `/inventory/stock/{companyId}/{productId}/{warehouseId}` | Ver stock |
| **Compras** | POST | `/purchases` | Crear compra + IN auto |
| | GET | `/purchases?companyId=` | Listar compras |
| | GET | `/purchases/{id}` | Ver compra |
| | GET | `/purchases/{id}/items` | Ítems de la compra |
| **Ventas** | POST | `/sales` | Crear venta + OUT auto |
| | GET | `/sales` | Listar ventas |
| | GET | `/sales/{id}` | Ver venta |
| | GET | `/sales/{id}/items` | Ítems de la venta |
| **Cuentas** | POST | `/accounts` | Crear cuenta contable |
| | GET | `/accounts?companyId=` | Listar cuentas |
| | GET | `/accounts/{id}` | Ver cuenta |
| | POST | `/ledger-entries` | Registrar asiento |
| | GET | `/ledger-entries?accountId=` | Asientos por cuenta |
| | GET | `/ledger-entries?companyId=` | Asientos por empresa |

### ¿Cómo llega una petición de inicio a fin?

```
Cliente (Postman / App)
        │
        │ POST /sales  { companyId, items... }
        ▼
SalesController.create()
        │  Inyecta SalesRepository, SalesItemRepository, InventoryRepository
        │
        ▼
CreateSalesUseCase.execute(dto)
        │  1. Valida stock via InventoryRepository.calculateStock()
        │  2. Calcula total
        │  3. SalesRepository.create()  →  INSERT INTO sales
        │  4. SalesItemRepository.create() → INSERT INTO sale_items
        │  5. InventoryRepository.registerMovement() → INSERT INTO inventory_movements
        │
        ▼
Respuesta 201: { id, total, createdAt, ... }
```

---

## 🗃️ La Base de Datos

El schema completo está en `database/database.sql`. Estas son las 13 tablas:

```
companies          ← Raíz de todo. Cada empresa es un tenante.
    │
    ├── users              ← Usuarios con roles OWNER/ADMIN/SELLER
    ├── warehouses         ← Almacenes físicos de la empresa
    ├── products           ← Catálogo de productos
    │
    ├── inventory_movements ← Cada IN/OUT/ADJUST de stock (histórico)
    │
    ├── purchases          ← Cabecera de compras
    ├── purchase_items     ← Líneas de cada compra
    │
    ├── sales              ← Cabecera de ventas
    ├── sale_items         ← Líneas de cada venta
    │
    ├── accounts           ← Cuentas contables (INCOME/EXPENSE/COST)
    ├── ledger_entries     ← Asientos contables
    │
    ├── cash_registers     ← Cajas registradoras (listas para implementar)
    └── cash_movements     ← Movimientos de caja (listos para implementar)
```

> 💡 **Multi-tenancy:** Todas las tablas tienen `company_id`. Cuando se filtra por `companyId`, una empresa nunca puede acceder a los datos de otra.

---

## 🔑 Archivos Raíz Importantes

### `src/application.ts` — El Gran Orquestador
Este es el archivo más importante del proyecto. Registra todo en el contenedor de inyección de dependencias de LoopBack:

```typescript
export class SaasBackendApplication extends BootMixin(RepositoryMixin(RestApplication)) {
    constructor() {
        this.dataSource(PostgresDataSource);    // Conexión a BD
        this.repository(CompanyRepository);     // Registra repositorios
        this.repository(UserRepository);
        this.repository(ProductRepository);
        // ... todos los repositorios
    }
}
```

LoopBack automáticamente detecta y registra los **controladores** al arrancar porque están en la carpeta `presentation/` (configurado en `bootOptions`).

### `src/index.ts` — La Entrada
Inicia el servidor en el puerto definido en `.env` (por defecto 3000).

### `src/migrate.ts` — Las Migraciones
```bash
npm run migrate          # Aplica cambios sin borrar datos
npm run migrate -- --rebuild  # Borra y recrea TODO (cuidado en producción)
```

---

## 🌱 Variables de Entorno (`.env`)

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=saas_backend
```

---

## 📦 Flujo de Desarrollo — ¿Cómo agregar un nuevo módulo?

Si mañana hubiera que agregar un módulo de **"Clientes"**, el proceso es siempre el mismo:

```
1. domain/customers/entities/customer.entity.ts
2. domain/customers/repositories/customer.repository.interface.ts
3. infrastructure/customers/models/customer.model.ts
4. infrastructure/customers/mappers/customer.mapper.ts
5. infrastructure/customers/repositories/customer.repository.ts
6. application/customers/use-cases/create-customer.use-case.ts
7. presentation/customers/controllers/customers.controller.ts
8. Registrar en application.ts: this.repository(CustomerRepository)
```

**Siempre el mismo patrón.** Eso hace que el proyecto sea muy fácil de escalar.

---

## 💡 Argumentos para Vender este Proyecto

| Característica | Beneficio |
|---|---|
| **Multi-tenant** | Una sola API sirve a muchas empresas |
| **Clean Architecture** | Fácil de mantener, testear y escalar |
| **Stock en tiempo real** | Calculado por movimientos, con historial completo |
| **Inventario automático** | Comprar/vender actualiza el stock sin pasos extra |
| **Módulo contable integrado** | No se necesita software externo para llevar cuentas |
| **Roles de usuario** | Control de acceso granular desde la BD |
| **TypeScript** | Código robusto, con tipado estático — menos bugs |
| **LoopBack 4** | Framework empresarial con DI, ORM y documentación automática |
| **PostgreSQL** | BD relacional robusta, con FK, constraints y UUID nativos |
| **Expandible** | Quedan tablas listas: `cash_registers` y `cash_movements` |

---

## 🧭 Flujo Completo de Uso (de 0 a venta)

```
1. POST /companies          → Crear empresa "Mi Tienda SAS"
2. POST /users (OWNER)      → Registrar al dueño
3. POST /users (ADMIN)      → Registrar al administrador  
4. POST /users (SELLER)     → Registrar al vendedor
5. POST /products           → Crear producto: "Camisa Azul"
6. POST /purchases          → Comprar 100 unidades a $15 c/u
                              (stock sube a 100 automáticamente)
7. POST /sales              → Vender 3 unidades a $40 c/u
                              (stock baja a 97 automáticamente)
8. GET /inventory/stock/... → Consultar stock: 97 unidades
9. POST /accounts           → Crear cuenta "Ingresos por Ventas"
10. POST /ledger-entries    → Registrar: +$120 de la venta
```

---

*Documento generado automáticamente. Última actualización: Febrero 2026.*
