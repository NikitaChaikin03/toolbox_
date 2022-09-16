import { Mapper, removeUndefinedValue } from '@libs/orm';
import { DeepPartial } from '@typings';

import { ToolboxDomainModel } from '../../domain/models';
import { ToolboxEntity } from '../entities';

export class ToolboxRepositoryMapper extends Mapper<ToolboxDomainModel, ToolboxEntity> {
  public toDatabaseEntity({ createdAt, id, name, tools, updatedAt }: DeepPartial<ToolboxDomainModel>): DeepPartial<ToolboxEntity> {
    return removeUndefinedValue({
      createdAt,
      id,
      name,
      tools: tools?.map((tool) => ({ ...tool, createdAt, updatedAt })),
      updatedAt,
    });
  }

  public toDomainEntity(entity: ToolboxEntity): ToolboxDomainModel {
    if (!entity) {
      return <ToolboxDomainModel>{};
    }

    const { createdAt, id, name, tools, updatedAt } = entity;

    return { createdAt, id, name, tools, updatedAt };
  }
}
