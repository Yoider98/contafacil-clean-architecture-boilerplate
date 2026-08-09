import {Product} from '../../../domain/inventory/entities/product.entity';
import {IProductRepository} from '../../../domain/inventory/repositories/product.repository.interface';

export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository)  { /* Inyectado por constructor */ }

  async execute(productData: Partial<Product>): Promise<Product>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    if (!productData.sku)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    if (!productData.name)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    if (
      productData.purchasePrice === undefined ||
      productData.purchasePrice === null
    )  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    if (productData.salePrice === undefined || productData.salePrice === null)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    if (productData.productType !== 'SERVICE' && !productData.warehouseId)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    if (productData.stockMin === undefined || productData.stockMin === null)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    if (productData.active === undefined || productData.active === null)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    if (!productData.costAccountCode)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    if (
      productData.taxPercentage === undefined ||
      productData.taxPercentage === null
    )  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    if (!productData.unitOfMeasure)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    if (productData.quantity === undefined || productData.quantity === null)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    const existingProduct = await this.productRepository.findBySku(
      productData.companyId,
      productData.sku,
    );

    if (existingProduct)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } already exists for this company`,
      );
    }

    if (productData.productType !== 'SERVICE')  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

      // Validar que la cuenta sea del grupo 14 (Inventarios) si se especifica
      if (!productData.inventoryAccountCode.startsWith('14')) {
        throw new Error(
          `inventoryAccountCode debe pertenecer al grupo 14 (Inventarios). ` +
            `Ejemplo: '1435' (Mercancías). Cuenta recibida: '${productData.inventoryAccountCode}'`,
        );
      }
    }

    const product = new Product(productData);
    return this.productRepository.save(product);
  }
}
