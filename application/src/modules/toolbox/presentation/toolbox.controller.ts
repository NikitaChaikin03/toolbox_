import { BaseError } from '@libs/exceptions';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ParseObjectFieldsToIntPipe } from '@libs/rest';

import { ToolboxService } from '../application';

import { CreateToolboxInput, UpdateToolboxByIdInput } from './inputs';
import {
  CreateToolboxResult,
  DeleteToolboxByIdResult,
  GetToolboxByIdResult,
  GetToolboxesResult,
  UpdateToolboxByIdResult,
} from './results';

@ApiTags('toolboxes')
@Controller('/toolboxes')
export class ToolboxController {
  constructor(private readonly toolboxService: ToolboxService) {}

  @ApiBadRequestResponse({ description: 'Toolbox with this name already exist', type: BaseError })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateToolboxResult })
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  public async createToolbox(@Body() input: CreateToolboxInput): Promise<CreateToolboxResult> {
    const { name, tools } = input;

    const data = await this.toolboxService.createToolbox({ name, tools });

    return { data };
  }

  @ApiBadRequestResponse({ description: 'Incorret path parameters', type: BaseError })
  @ApiNotFoundResponse({ type: BaseError })
  @ApiOkResponse({ type: DeleteToolboxByIdResult })
  @Delete('/:toolboxId')
  @HttpCode(HttpStatus.OK)
  public async deleteToolboxById(
    @Param(new ParseObjectFieldsToIntPipe()) { toolboxId }: Record<string, number>,
  ): Promise<DeleteToolboxByIdResult> {
    await this.toolboxService.deleteToolboxById({ toolboxId });

    return { data: { success: true } };
  }

  @ApiBadRequestResponse({ description: 'Incorret path parameters', type: BaseError })
  @ApiOkResponse({ type: GetToolboxByIdResult })
  @Get('/:toolboxId')
  @HttpCode(HttpStatus.OK)
  public async getToolboxById(
    @Param(new ParseObjectFieldsToIntPipe()) { toolboxId }: Record<string, number>,
  ): Promise<GetToolboxByIdResult> {
    const data = await this.toolboxService.getToolboxById({ toolboxId });

    return { data };
  }

  @ApiOkResponse({ type: GetToolboxesResult })
  @Get('/')
  @HttpCode(HttpStatus.OK)
  public async getToolboxes(): Promise<GetToolboxesResult> {
    const data = await this.toolboxService.getToolboxes();

    return { data };
  }

  @ApiBadRequestResponse({ description: 'Incorret path parameters', type: BaseError })
  @HttpCode(HttpStatus.OK)
  @Put('/:toolboxId')
  public async updateToolboxById(
    @Body() input: UpdateToolboxByIdInput,
    @Param(new ParseObjectFieldsToIntPipe()) { toolboxId }: Record<string, number>,
  ): Promise<UpdateToolboxByIdResult> {
    const { name } = input;

    const data = await this.toolboxService.updateToolboxById({ toolboxId, toolboxName: name });

    return { data };
  }
}
