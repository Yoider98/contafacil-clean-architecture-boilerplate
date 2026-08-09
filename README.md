# SaaS Backend - Inventario y Contabilidad

Backend robusto desarrollado con **LoopBack 4** y **TypeScript**, diseñado bajo los principios de **Clean Architecture**. Orientado a proporcionar una solución escalable para la gestión de inventarios, contabilidad (PUC Colombia), ventas, compras y flujos de caja.

## 🚀 Características Principales

- **Arquitectura Limpia**: Separación clara entre Dominio, Aplicación, Infraestructura y Presentación.
- **Módulo de Contabilidad Integrado**: 
  - Gestión automática del Plan Único de Cuentas (PUC Colombia).
  - Generación en tiempo real de **Reportes Financieros** (Balance de Comprobación, Libro Mayor y Auxiliares por Tercero).
  - Registro automático de asientos contables desde Ventas, Compras y Movimientos de Caja.
- **Tipos de Empresa Transversales**: Soporte nativo para flujos de empresas **Comerciales, de Servicios, Mixtas y Manufactureras**, adaptando reglas de negocio automáticamente (ej. exclusión de validación de stock para servicios).
- **Control de Inventario Multi-almacén**: Gestión de productos físicos y servicios, con múltiples bodegas y movimientos valorizados (IN/OUT/ADJUST).
- **Gestión Financiera de Caja**: Control estricto de apertura, cierre, ingresos y egresos de efectivo vinculados al flujo diario.
- **Facturación Electrónica (DIAN)**: Módulo de emisión y firmas de resoluciones de facturación electrónica integrado al flujo de ventas.
- **Tests Transversales Automatizados**: Suite completa de +200 aserciones en Postman/Newman que valida el ecosistema entero garantizando compatibilidad y estabilidad en la base de datos real.

---

## 🏗️ Estructura del Proyecto

El proyecto sigue una estructura de capas para facilitar el mantenimiento y las pruebas:

- **src/domain**: Entidades, interfaces de repositorios y lógica central del negocio.
- **src/application**: Casos de uso (Use Cases) que coordinan la lógica entre el dominio y la infraestructura.
- **src/infrastructure**: Implementaciones concretas de persistencia (PostgreSQL), repositorios y mappers.
- **src/presentation**: Controladores que exponen la API REST y manejan las peticiones HTTP.

---

## 🛠️ Tecnologías y Comandos

### Requisitos
- **Node.js**: v18+ (recomendado v20)
- **Base de Datos**: PostgreSQL

### Instalación
```bash
npm install
```

### Desarrollo y Ejecución
```bash
# Reconstruir y arrancar el servidor
npm run rebuild
npm start
```

### Otros Comandos Útiles
- `npm run migrate`: Ejecuta las migraciones de esquemas en la base de datos.
- `npm run build`: Compila el proyecto de TypeScript a JavaScript.
- `npm run clean`: Limpia los artefactos de compilación (`dist/`).
- `npm run lint`: Verifica y corrige el estilo del código.

---

## 📑 Documentación de la API

Una vez iniciado el servidor, puedes explorar y probar la API de forma interactiva en:
👉 [http://localhost:3000/explorer](http://localhost:3000/explorer)

La colección de Postman oficial se encuentra en la carpeta `/postman` del repositorio.

---

## 🛡️ Estándares HTTP
Este proyecto sigue estrictamente los estándares REST. Todas las peticiones `POST` de creación satisfactoria devuelven un status code **201 Created**, asegurando compatibilidad con herramientas de integración continua y testing automatizado.

---
Desarrollado con ❤️ para soluciones SaaS escalables.
