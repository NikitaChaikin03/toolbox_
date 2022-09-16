import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './presentation';

@Module({
  controllers: [HealthController],
  exports: [],
  imports: [TerminusModule],
  providers: [],
})
export class HealthModule {}
