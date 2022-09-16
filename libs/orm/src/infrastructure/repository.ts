import { DeepPartial, FindConditions, Repository as Entity } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { RepositoryInterface } from '@libs/ddd';

import { Mapper } from './orm.mapper';

interface PaginationOptions {
  limit?: number;
  offset?: number;
}

export class BaseRepository<DomainModel, DatabaseEntity> implements RepositoryInterface<DomainModel> {
  protected constructor(
    private readonly entity: Entity<DatabaseEntity>,
    protected readonly mapper: Mapper<DomainModel, DatabaseEntity>,
  ) {}

  public async add(domainModel: DeepPartial<DomainModel>): Promise<DomainModel> {
    const databaseEntity = this.mapper.toDatabaseEntity(domainModel);

    const result = await this.entity.save(databaseEntity);

    return this.mapper.toDomainEntity(result);
  }

  public async addMultiple(domainModels: DeepPartial<DomainModel>[]): Promise<DomainModel[]> {
    const databaseEntities = domainModels.map((_) => this.mapper.toDatabaseEntity(_));

    const result = await this.entity.save(databaseEntities);

    return result.map((_) => this.mapper.toDomainEntity(_));
  }

  public async count(filter: DeepPartial<DomainModel>) {
    const databaseFindOptions = this.mapper.toDatabaseEntity(filter);

    return this.entity.count({ where: databaseFindOptions });
  }

  public async delete(filter: DeepPartial<DomainModel>) {
    const databaseEntity = this.mapper.toDatabaseEntity(filter) as FindConditions<DatabaseEntity>;

    await this.entity.delete(databaseEntity);
  }

  public async deleteMultiple(filter: DeepPartial<DomainModel>) {
    const databaseFindOptions = this.mapper.toDatabaseEntity(filter) as FindConditions<DatabaseEntity>;

    await this.entity.delete(databaseFindOptions);
  }

  public async deleteOneAndGet(filter: DeepPartial<DomainModel>) {
    const databaseFindOptions = this.mapper.toDatabaseEntity(filter) as FindConditions<DatabaseEntity>;

    const deletableEntity = await this.entity.findOne({ where: databaseFindOptions });

    await this.entity.delete(databaseFindOptions);

    return this.mapper.toDomainEntity(deletableEntity);
  }

  public async exists(filter: DeepPartial<DomainModel>) {
    const count = await this.count(filter);

    return count > 0;
  }

  public async find(filter?: DeepPartial<DomainModel>, { limit, offset }: PaginationOptions = {}) {
    const databaseFindOptions = this.mapper.toDatabaseEntity(filter);

    const entities = await this.entity.find({ skip: offset, take: limit, where: databaseFindOptions });

    return entities.map((_) => this.mapper.toDomainEntity(_));
  }

  public async findOne(filter: DeepPartial<DomainModel>) {
    const databaseFindOptions = this.mapper.toDatabaseEntity(filter);

    const entity = await this.entity.findOne({ where: databaseFindOptions });

    return this.mapper.toDomainEntity(entity);
  }

  public async updateOne(filter: DeepPartial<DomainModel>, entity: DeepPartial<DomainModel>) {
    const databaseFindOptions = this.mapper.toDatabaseEntity(filter) as FindConditions<DatabaseEntity>;
    const databaseQueryDeepPartialEntity = this.mapper.toDatabaseEntity(entity) as QueryDeepPartialEntity<DatabaseEntity>;

    await this.entity.update(databaseFindOptions, databaseQueryDeepPartialEntity);
  }

  public async updateOneAndGet(filter: DeepPartial<DomainModel>, entity: DeepPartial<DomainModel>) {
    const databaseFindOptions = this.mapper.toDatabaseEntity(filter) as FindConditions<DatabaseEntity>;
    const databaseQueryDeepPartialEntity = this.mapper.toDatabaseEntity(entity) as QueryDeepPartialEntity<DatabaseEntity>;

    await this.entity.update(databaseFindOptions, databaseQueryDeepPartialEntity);

    const mergedFindOptions = Object.keys(databaseFindOptions).reduce((accumulator, databaseFindOptionsKey) => {
      const updatedFindOptionsValue = databaseQueryDeepPartialEntity[databaseFindOptionsKey];

      if (updatedFindOptionsValue) {
        accumulator[databaseFindOptionsKey] = updatedFindOptionsValue;

        return accumulator;
      }

      accumulator[databaseFindOptionsKey] = databaseFindOptions[databaseFindOptionsKey];

      return accumulator;
    }, {});

    const updatedEntity = await this.entity.findOne({ where: mergedFindOptions });

    return this.mapper.toDomainEntity(updatedEntity);
  }
}
