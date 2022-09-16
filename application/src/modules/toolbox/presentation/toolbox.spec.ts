import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';

import { ToolboxModule } from '../toolbox.module';

describe('Toolbox', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ToolboxModule,
        TypeOrmModule.forRoot({
          autoLoadEntities: true,
          logging: true,
          type: 'postgres',
          url: 'postgres://postgres:postgres@0.0.0.0:5433/toolbox',
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST toolboxes`, async () => {
    const http = request(app.getHttpServer());

    const result = await http.post('/toolboxes').send({
      name: 'programming',
      tools: [
        {
          description: 'development environment',
          name: 'vscode',
        },
      ],
    });

    const addedToolbox = await result.body;

    expect(addedToolbox.data.name).toBe('programming');
    expect(addedToolbox.data.tools[0].name).toBe('vscode');
    expect(addedToolbox.data.tools[0].description).toBe('development environment');

    await http.delete(`/toolboxes/${addedToolbox.data.id}`);
  });

  afterAll(async () => {
    await app.close();
  });
});
