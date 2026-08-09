import {User} from '../entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByCompany(companyId: string): Promise<User[]>;
  update(user: User): Promise<void>;
}
