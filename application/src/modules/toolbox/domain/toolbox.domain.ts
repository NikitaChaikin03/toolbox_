import { Inject, Injectable } from '@nestjs/common';

import { TOOL_REPOSITORY_TOKEN, TOOLBOX_REPOSITORY_TOKEN } from '../core/tokens';

import { ToolboxRepositoryInterface, ToolRepositoryInterface } from './repository-interfaces';
import { ToolboxDomainError } from './toolbox-domain.error';
import {
  CreateToolboxParameters,
  CreateToolParameters,
  DeleteToolboxByIdParameters,
  DeleteToolByIdParameters,
  GetToolboxToolsParameters,
  GetToolboxWithToolsByIdParameters,
  GetToolByIdParameters,
  ReassignToolParameters,
  UpdateToolboxByIdParameters,
  UpdateToolByIdParameters,
} from './toolbox-domain.type';

@Injectable()
export class ToolboxDomain {
  constructor(
    @Inject(TOOL_REPOSITORY_TOKEN) private readonly toolRepository: ToolRepositoryInterface,
    @Inject(TOOLBOX_REPOSITORY_TOKEN) private readonly toolboxRepository: ToolboxRepositoryInterface,
  ) {}

  public async createTool({ description, name, toolboxId }: CreateToolParameters) {
    const createdAt = new Date();

    return this.toolRepository.add({ createdAt, description, name, toolboxId, updatedAt: createdAt });
  }

  public async createToolbox({ name, tools }: CreateToolboxParameters) {
    const isToolboxExist = await this.toolboxRepository.exists({ name });

    if (isToolboxExist) {
      return ToolboxDomainError.toolboxWithThisNameAlreadyExist;
    }

    const createdAt = new Date();

    return this.toolboxRepository.add({ createdAt, name, tools, updatedAt: createdAt });
  }

  public async deleteToolById({ toolId, toolboxId }: DeleteToolByIdParameters) {
    const isToolExist = await this.toolRepository.exists({ id: toolId, toolboxId });

    if (!isToolExist) {
      return ToolboxDomainError.toolNotFound;
    }

    await this.toolRepository.delete({ id: toolId, toolboxId });
  }

  public async deleteToolboxById({ toolboxId }: DeleteToolboxByIdParameters) {
    const isToolboxExist = await this.toolboxRepository.exists({ id: toolboxId });

    if (!isToolboxExist) {
      return ToolboxDomainError.toolboxNotFound;
    }

    await this.toolboxRepository.delete({ id: toolboxId });
  }

  public async getToolById({ toolId, toolboxId }: GetToolByIdParameters) {
    return this.toolRepository.findOne({ id: toolId, toolboxId });
  }

  public async getToolboxTools({ toolboxId }: GetToolboxToolsParameters) {
    return this.toolRepository.find({ toolboxId });
  }

  public async getToolboxWithToolsById({ toolboxId }: GetToolboxWithToolsByIdParameters) {
    const toolbox = await this.toolboxRepository.findOne({ id: toolboxId });
    const tools = await this.toolRepository.find({ toolboxId });

    return { ...toolbox, tools };
  }

  public async getToolboxes() {
    return this.toolboxRepository.findToolboxesWithTools();
  }

  public async reassignTool({ fromToolboxId, toToolboxId, toolId }: ReassignToolParameters) {
    const isToolExist = await this.toolRepository.exists({ id: toolId, toolboxId: fromToolboxId });

    if (!isToolExist) {
      return ToolboxDomainError.toolNotFound;
    }

    return this.toolRepository.updateOneAndGet(
      { id: toolId, toolboxId: fromToolboxId },
      { toolboxId: toToolboxId, updatedAt: new Date() },
    );
  }

  public async updateToolById({ description, name, toolId, toolboxId }: UpdateToolByIdParameters) {
    const isToolExist = await this.toolRepository.exists({ id: toolId, toolboxId });

    if (!isToolExist) {
      return ToolboxDomainError.toolNotFound;
    }

    const updatedAt = new Date();

    return this.toolRepository.updateOneAndGet({ id: toolId, toolboxId }, { description, name, updatedAt });
  }

  public async updateToolboxById({ toolboxId, toolboxName }: UpdateToolboxByIdParameters) {
    const isToolboxExist = await this.toolboxRepository.exists({ id: toolboxId });

    if (!isToolboxExist) {
      return ToolboxDomainError.toolboxNotFound;
    }

    const { createdAt, id, name, updatedAt } = await this.toolboxRepository.updateOneAndGet(
      { id: toolboxId },
      { name: toolboxName, updatedAt: new Date() },
    );

    return { createdAt, id, name, updatedAt };
  }
}
