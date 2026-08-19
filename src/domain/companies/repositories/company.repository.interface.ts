import {Company} from '../entities/company.entity';

export interface ICompanyRepository {
  create(company: Company): Promise<Company>;
  update(company: Company): Promise<Company>;
  findById(id: string): Promise<Company>;
  findAll(): Promise<Company[]>;
  findByIds(ids: string[]): Promise<Company[]>;
}
