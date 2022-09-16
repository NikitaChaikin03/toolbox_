import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { Config } from '../configuration.type';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const { databaseUrl } = this.configService.get('typeorm');
    const { environment } = this.configService.get('application');

    return {
      autoLoadEntities: true,
      logging: environment !== 'production',
      type: 'postgres',
      url: databaseUrl,
    };
  }
}
