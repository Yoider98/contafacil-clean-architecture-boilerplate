import {inject} from '@loopback/core';
import {DefaultCrudRepository, AnyObject} from '@loopback/repository';
import {Warehouse} from '../../../domain/inventory/entities/warehouse.entity';
import {IWarehouseRepository} from '../../../domain/inventory/repositories/warehouse.repository.interface';
import {InventoryMapper} from '../mappers/inventory.mapper';
import {WarehouseModel} from '../models/warehouse.model';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';

export class WarehouseRepository implements IWarehouseRepository {
  private lbRepository: DefaultCrudRepository<
    WarehouseModel,
    typeof WarehouseModel.prototype.id
  >;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(WarehouseModel, dataSource);
  }

  async save(warehouse: Warehouse, options?: AnyObject): Promise<Warehouse>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } else {
      savedModel = await this.lbRepository.create(model, options);
    }
    return InventoryMapper.toWarehouseDomain(savedModel);
  }

  async findById(id: string, options?: AnyObject): Promise<Warehouse | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } catch (e)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
  }

  async findByCompanyId(
    companyId: string,
    options?: AnyObject,
  ): Promise<Warehouse[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }}, options);
    return models.map(InventoryMapper.toWarehouseDomain);
  }
}
