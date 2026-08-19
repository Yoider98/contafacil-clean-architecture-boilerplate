import {inject} from '@loopback/core';
import {Masterlist} from '../../../domain/shared/entities/masterlist.entity';
import {IMasterlistRepository} from '../../../domain/shared/repositories/masterlist.repository.interface';

export class GetMasterlistByCategoryUseCase {
  constructor(
    @inject('repositories.MasterlistRepository')
    private masterlistRepo: IMasterlistRepository,
  ) {}

  async execute(category: string): Promise<Masterlist[]>  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }
}
