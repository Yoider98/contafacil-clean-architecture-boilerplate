import {Product} from '../../../domain/inventory/entities/product.entity';
import {IProductRepository} from '../../../domain/inventory/repositories/product.repository.interface';
import {AnyObject} from '@loopback/repository';

export class GetProductsByCompanyUseCase {
  constructor(private productRepository: IProductRepository)  { /* Inyectado por constructor */ }

  async execute(companyId: string, options?: AnyObject): Promise<Product[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    return this.productRepository.findByCompanyId(companyId, options);
  }
}
