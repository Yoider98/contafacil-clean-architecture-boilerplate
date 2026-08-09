import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CashRegister} from '../../../domain/cash/entities/cash-register.entity';
import {ICashRegisterRepository} from '../../../domain/cash/repositories/cash-register.repository.interface';
import {PostgresDataSource} from '../../database/datasources/postgres.datasource';
import {CashMapper} from '../mappers/cash.mapper';
import {CashRegisterModel} from '../models/cash-register.model';

export class CashRegisterRepository implements ICashRegisterRepository {
  private lbRepository: DefaultCrudRepository<
    CashRegisterModel,
    typeof CashRegisterModel.prototype.id
  >;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    this.lbRepository = new DefaultCrudRepository(
      CashRegisterModel,
      dataSource,
    );
  }

  async create(register: CashRegister): Promise<CashRegister>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findById(id: string): Promise<CashRegister | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }

  async findByCompanyId(
    companyId: string,
    status?: string,
  ): Promise<CashRegister[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  };
    if (status) where['status'] = status;
    const models = await this.lbRepository.find({where});
    return models.map(CashMapper.toRegisterDomain);
  }

  async findOpenByCompanyAndDate(
    companyId: string,
    date: string,
  ): Promise<CashRegister | null>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }});
    if (!models.length) return null;
    return CashMapper.toRegisterDomain(models[0]);
  }

  async update(id: string, data: Partial<CashRegister>): Promise<CashRegister>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  };
    if (data.closingBalance !== undefined)
      updateData.closingBalance = data.closingBalance;
    if (data.status !== undefined) updateData.status = data.status;
    await this.lbRepository.updateById(id, updateData);
    const updated = await this.lbRepository.findById(id);
    return CashMapper.toRegisterDomain(updated);
  }
}
