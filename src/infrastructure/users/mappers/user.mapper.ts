import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../domain/users/entities/user.entity';
import { UserModel } from '../models/user.model';

export class UserMapper {
  static toDomain(model: UserModel): User  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  static toPersistence(entity: User): UserModel  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
