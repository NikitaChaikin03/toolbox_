import { Mapper, removeUndefinedValue } from '@libs/orm';
import { DeepPartial } from '@typings';

import { ToolDomainModel } from '../../domain/models';
import { ToolEntity } from '../entities';

export class ToolRepositoryMapper extends Mapper<ToolDomainModel, ToolEntity> {
  public toDatabaseEntity({
    createdAt,
    description,
    id,
    name,
    toolboxId,
    updatedAt,
  }: DeepPartial<ToolDomainModel>): DeepPartial<ToolEntity> {
    return removeUndefinedValue({ createdAt, description, id, name, toolboxId, updatedAt });
  }

  public toDomainEntity(entity: ToolEntity): ToolDomainModel {
    if (!entity) {
      return <ToolDomainModel>{};
    }

    const { createdAt, description, id, name, toolboxId, updatedAt } = entity;

    return { createdAt, description, id, name, toolboxId, updatedAt };
  }
}
