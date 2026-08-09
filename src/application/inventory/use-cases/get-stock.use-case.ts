import {IInventoryRepository} from '../../../domain/inventory/repositories/inventory.repository.interface';

export class GetStockUseCase {
  constructor(private inventoryRepository: IInventoryRepository)  { /* Inyectado por constructor */ }

  async execute(
    companyId: string,
    productId: string,
    warehouseId: string,
  ): Promise<number>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
