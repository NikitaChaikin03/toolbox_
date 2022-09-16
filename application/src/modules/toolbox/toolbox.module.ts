import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ToolboxService } from './application';
import { TOOL_REPOSITORY_TOKEN, TOOLBOX_REPOSITORY_TOKEN } from './core/tokens';
import { ToolboxDomain } from './domain';
import {
  ToolboxEntity,
  ToolboxRepository,
  ToolboxRepositoryMapper,
  ToolEntity,
  ToolRepository,
  ToolRepositoryMapper,
} from './infastructure';
import { ToolboxController, ToolController } from './presentation';

@Module({
  controllers: [ToolboxController, ToolController],
  exports: [],
  imports: [TypeOrmModule.forFeature([ToolboxEntity, ToolEntity])],
  providers: [
    { provide: TOOL_REPOSITORY_TOKEN, useClass: ToolRepository },
    { provide: TOOLBOX_REPOSITORY_TOKEN, useClass: ToolboxRepository },
    ToolboxDomain,
    ToolboxRepositoryMapper,
    ToolboxService,
    ToolRepositoryMapper,
  ],
})
export class ToolboxModule {}
