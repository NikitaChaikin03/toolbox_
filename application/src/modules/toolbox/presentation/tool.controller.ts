import { BaseError } from '@libs/exceptions';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ParseObjectFieldsToIntPipe } from '@libs/rest';

import { ToolboxService } from '../application';

import { CreateToolInput, ReassignToolInput, UpdateToolByIdInput } from './inputs';
import {
  CreateToolResult,
  DeleteToolByIdResult,
  GetToolboxToolsByToolboxIdResult,
  GetToolByIdResult,
  ReassignToolResult,
  UpdateToolByIdResult,
} from './results';

@ApiBadRequestResponse({ description: 'Incorret path parameters', type: BaseError })
@ApiTags('toolbox-tools')
@Controller('/toolboxes/:toolboxId/tools')
export class ToolController {
  constructor(private readonly toolboxService: ToolboxService) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: CreateToolResult })
  @HttpCode(HttpStatus.OK)
  @Post('/')
  public async createTool(
    @Body() input: CreateToolInput,
    @Param(new ParseObjectFieldsToIntPipe()) { toolboxId }: Record<string, number>,
  ): Promise<CreateToolResult> {
    const { description, name } = input;

    const data = await this.toolboxService.createTool({ description, name, toolboxId });

    return { data };
  }

  @ApiNotFoundResponse({ type: BaseError })
  @ApiOkResponse({ type: DeleteToolByIdResult })
  @Delete('/:toolId')
  @HttpCode(HttpStatus.OK)
  public async deleteToolById(
    @Param(new ParseObjectFieldsToIntPipe()) { toolId, toolboxId }: Record<string, number>,
  ): Promise<DeleteToolByIdResult> {
    await this.toolboxService.deleteToolById({ toolId, toolboxId });

    return { data: { success: true } };
  }

  @ApiOkResponse({ type: GetToolByIdResult })
  @Get('/:toolId')
  @HttpCode(HttpStatus.OK)
  public async getToolById(
    @Param(new ParseObjectFieldsToIntPipe()) { toolId, toolboxId }: Record<string, number>,
  ): Promise<GetToolByIdResult> {
    const data = await this.toolboxService.getToolById({ toolId, toolboxId });

    return { data };
  }

  @ApiOkResponse({ type: GetToolboxToolsByToolboxIdResult })
  @Get('/')
  @HttpCode(HttpStatus.OK)
  public async getToolboxToolsByToolboxId(
    @Param(new ParseObjectFieldsToIntPipe()) { toolboxId }: Record<string, number>,
  ): Promise<GetToolboxToolsByToolboxIdResult> {
    const data = await this.toolboxService.getToolboxToolsByToolboxId({ toolboxId });

    return { data };
  }

  @ApiNotFoundResponse({ type: BaseError })
  @ApiOkResponse({ type: ReassignToolResult })
  @HttpCode(HttpStatus.OK)
  @Put('/:toolId/reassign')
  public async reassignTool(
    @Body() input: ReassignToolInput,
    @Param(new ParseObjectFieldsToIntPipe()) { toolId, toolboxId }: Record<string, number>,
  ): Promise<ReassignToolResult> {
    const { toToolboxId } = input;

    const data = await this.toolboxService.reassignTool({ fromToolboxId: toolboxId, toToolboxId, toolId });

    return { data };
  }

  @ApiNotFoundResponse({ type: BaseError })
  @ApiOkResponse({ type: UpdateToolByIdResult })
  @HttpCode(HttpStatus.OK)
  @Put('/:toolId')
  public async updateToolById(
    @Body() input: UpdateToolByIdInput,
    @Param(new ParseObjectFieldsToIntPipe()) { toolId, toolboxId }: Record<string, number>,
  ): Promise<UpdateToolByIdResult> {
    const { description, name } = input;

    const data = await this.toolboxService.updateToolById({ description, name, toolId, toolboxId });

    return { data };
  }
}
