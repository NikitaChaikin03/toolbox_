import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository, ImplementedClassValidator } from '@libs/orm';

import { ToolDomainModel } from '../../domain/models';
import { ToolRepositoryInterface } from '../../domain/repository-interfaces';
import { ToolEntity } from '../entities';
import { ToolRepositoryMapper } from '../mappers';

@Injectable()
export class ToolRepository
  extends BaseRepository<ToolDomainModel, ToolEntity>
  implements ImplementedClassValidator<ToolRepository, ToolRepositoryInterface>
{
  constructor(
    @InjectRepository(ToolEntity)
    private readonly toolEntity: Repository<ToolEntity>,
    mapper: ToolRepositoryMapper,
  ) {
    super(toolEntity, mapper);
  }
}
