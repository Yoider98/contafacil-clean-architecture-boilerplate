import {Warehouse} from '../../../domain/inventory/entities/warehouse.entity';
import {IWarehouseRepository} from '../../../domain/inventory/repositories/warehouse.repository.interface';
import {AnyObject} from '@loopback/repository';

export class CreateWarehouseUseCase {
  constructor(private warehouseRepository: IWarehouseRepository)  { /* Inyectado por constructor */ }

  async execute(
    warehouseData: Partial<Warehouse>,
    options?: AnyObject,
  ): Promise<Warehouse>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    if (!warehouseData.name)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

    const warehouse = new Warehouse(warehouseData);
    return this.warehouseRepository.save(warehouse, options);
  }
}
