import { DeepPartial } from '@typings';

interface PaginationOptions {
  limit?: number;
  offset?: number;
}

export interface RepositoryInterface<DomainModel> {
  add(domainModel: DeepPartial<DomainModel>): Promise<DomainModel>;
  addMultiple(domainModels: DeepPartial<DomainModel>[]): Promise<DomainModel[]>;
  count(filter: DeepPartial<DomainModel>): Promise<number>;
  delete(filter: DeepPartial<DomainModel>): Promise<void>;
  deleteMultiple(filter: DeepPartial<DomainModel>): Promise<void>;
  deleteOneAndGet(filter: DeepPartial<DomainModel>): Promise<DomainModel>;
  exists(filter: DeepPartial<DomainModel>): Promise<boolean>;
  find(filter?: DeepPartial<DomainModel>, pagination?: PaginationOptions): Promise<DomainModel[]>;
  findOne(filter: DeepPartial<DomainModel>): Promise<DomainModel>;
  updateOne(filter: DeepPartial<DomainModel>, entity: DeepPartial<DomainModel>): Promise<void>;
  updateOneAndGet(filter: DeepPartial<DomainModel>, entity: DeepPartial<DomainModel>): Promise<DomainModel>;
}
