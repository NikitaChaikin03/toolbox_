import { DeepPartial } from 'typeorm';

export abstract class Mapper<DomainModel, DatabaseEntity> {
  public abstract toDatabaseEntity(domainModel: DeepPartial<DomainModel>): DeepPartial<DatabaseEntity>;
  public abstract toDomainEntity(ormEntity: DatabaseEntity): DomainModel;
}
