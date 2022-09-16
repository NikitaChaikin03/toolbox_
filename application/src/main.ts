import { exceptionFactory, HttpExceptionFilter } from '@libs/exceptions';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ApplicationToolboxModule } from './application-toolbox.module';
import { Config } from './config';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(ApplicationToolboxModule);
  const configService = app.get<ConfigService<Config>>(ConfigService);
  const { port } = configService.get('application');

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory,
      forbidUnknownValues: false,
      transform: true,
    }),
  );

  const config = new DocumentBuilder().setTitle('Toolbox application api').setDescription('Description').setVersion('1.0').build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  logger.log(`Toolbox is running on ${await app.getUrl()}`);
}
bootstrap();
