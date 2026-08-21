import {inject} from '@loopback/core';
import {DefaultCrudRepository, AnyObject} from '@loopback/repository';
import {InventoryMovement} from '../../../domain/inventory/entities/inventory-movement.entity';
import {IInventoryRepository} from '../../../domain/inventory/repositories/inventory.repository.interface';
import {InventoryMapper} from '../mappers/inventory.mapper';
import {InventoryMovementModel} from '../models/inventory-movement.model';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';

export class InventoryRepository implements IInventoryRepository {
  private lbRepository: DefaultCrudRepository<
    InventoryMovementModel,
    typeof InventoryMovementModel.prototype.id
  >;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(
      InventoryMovementModel,
      dataSource,
    );
  }

  async registerMovement(
    movement: InventoryMovement,
    options?: AnyObject,
  ): Promise<InventoryMovement>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async calculateStock(
    companyId: string,
    productId: string,
    warehouseId: string,
    options?: AnyObject,
  ): Promise<number>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findMovementsByCompany(
    companyId: string,
    options?: AnyObject,
  ): Promise<InventoryMovement[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }}, options);
    return models.map(m => InventoryMapper.toMovementDomain(m));
  }
}
