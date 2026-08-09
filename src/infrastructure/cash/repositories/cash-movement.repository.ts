import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CashMovement} from '../../../domain/cash/entities/cash-movement.entity';
import {ICashMovementRepository} from '../../../domain/cash/repositories/cash-movement.repository.interface';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {CashMapper} from '../mappers/cash.mapper';
import {CashMovementModel} from '../models/cash-movement.model';

export class CashMovementRepository implements ICashMovementRepository {
  private lbRepository: DefaultCrudRepository<
    CashMovementModel,
    typeof CashMovementModel.prototype.id
  >;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(
      CashMovementModel,
      dataSource,
    );
  }

  async create(movement: CashMovement): Promise<CashMovement>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findByCashRegisterId(cashRegisterId: string): Promise<CashMovement[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  },
      order: ['createdAt ASC'],
    });
    return models.map(CashMapper.toMovementDomain);
  }

  async sumByCashRegisterId(
    cashRegisterId: string,
  ): Promise< {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }> {
    const movements = await this.lbRepository.find({where: {cashRegisterId}});
    let totalIn = 0;
    let totalOut = 0;
    for (const m of movements)  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  } else if (m.type === 'OUT')  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
    }
    return {totalIn, totalOut};
  }
}
