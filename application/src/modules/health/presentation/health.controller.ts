import {
  MEMORY_HEALTH_INDICATOR_HEAP_KEY,
  MEMORY_HEALTH_INDICATOR_HEAP_THRESHOLD,
  MEMORY_HEALTH_INDICATOR_RSS_KEY,
  MEMORY_HEALTH_INDICATOR_RSS_THRESOLD,
  TYPEORM_HEALTH_INDICATOR_KEY,
} from '@libs/health';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';

@ApiTags('/health')
@Controller('/health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
    private readonly typeormHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @HealthCheck()
  @Get()
  public async check() {
    return this.healthCheckService.check([
      () => this.memoryHealthIndicator.checkHeap(MEMORY_HEALTH_INDICATOR_HEAP_KEY, MEMORY_HEALTH_INDICATOR_HEAP_THRESHOLD),
      () => this.memoryHealthIndicator.checkRSS(MEMORY_HEALTH_INDICATOR_RSS_KEY, MEMORY_HEALTH_INDICATOR_RSS_THRESOLD),
      () => this.typeormHealthIndicator.pingCheck(TYPEORM_HEALTH_INDICATOR_KEY),
    ]);
  }
}
