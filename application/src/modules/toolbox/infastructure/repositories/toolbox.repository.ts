import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository, ImplementedClassValidator } from '@libs/orm';

import { ToolboxDomainModel } from '../../domain/models';
import { ToolboxRepositoryInterface } from '../../domain/repository-interfaces';
import { ToolboxEntity } from '../entities';
import { ToolboxRepositoryMapper } from '../mappers';

@Injectable()
export class ToolboxRepository
  extends BaseRepository<ToolboxDomainModel, ToolboxEntity>
  implements ImplementedClassValidator<ToolboxRepository, ToolboxRepositoryInterface>
{
  constructor(
    @InjectRepository(ToolboxEntity)
    private readonly toolboxEntity: Repository<ToolboxEntity>,
    mapper: ToolboxRepositoryMapper,
  ) {
    super(toolboxEntity, mapper);
  }

  public async findToolboxesWithTools(): Promise<ToolboxDomainModel[]> {
    const toolboxes = await this.toolboxEntity.find({ relations: ['tools'] });

    return toolboxes.map((toolbox) => this.mapper.toDomainEntity(toolbox));
  }
}
