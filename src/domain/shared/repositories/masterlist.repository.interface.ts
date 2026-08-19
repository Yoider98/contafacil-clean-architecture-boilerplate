import {Masterlist} from '../entities/masterlist.entity';

export interface IMasterlistRepository {
  create(item: Masterlist): Promise<Masterlist>;
  update(item: Masterlist): Promise<Masterlist>;
  findById(id: string): Promise<Masterlist | null>;
  findByCategory(category: string): Promise<Masterlist[]>;
  findAll(): Promise<Masterlist[]>;
}
