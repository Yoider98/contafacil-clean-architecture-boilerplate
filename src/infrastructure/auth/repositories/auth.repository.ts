import jwt, {JwtPayload} from 'jsonwebtoken';
import {ITokenRepositoryInterface} from '../../../domain/auth/repositories/token.repository.interface';

export class AuthRepository implements ITokenRepositoryInterface {
  private secret = process.env.JWT_SECRET ?? 'supersecret'; // Usar variable de entorno

  generateToken(payload: Record<string, unknown>): string  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  });
  }

  verifyToken(token: string): JwtPayload | string  {
    // La lógica de negocio detallada de este caso de uso o implementación de infraestructura
    // es privada y comercial. Se muestra únicamente la arquitectura y firma del método.
    throw new Error("Showcase: Método no implementado.");
  }
}
