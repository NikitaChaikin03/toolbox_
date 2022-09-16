import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configuration, TypeormConfigService, validate } from './config';
import { HealthModule } from './modules/health';
import { ToolboxModule } from './modules/toolbox';

@Module({
  controllers: [],
  exports: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, validate }),
    TypeOrmModule.forRootAsync({ useClass: TypeormConfigService }),
    HealthModule,
    ToolboxModule,
  ],
  providers: [],
})
export class ApplicationToolboxModule {}
