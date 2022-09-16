import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

import { ToolboxDomain, ToolboxDomainError } from '../domain';

import {
  CreateToolboxParameters,
  CreateToolParameters,
  DeleteToolboxByIdParameters,
  DeleteToolByIdParameters,
  GetToolboxByIdParameters,
  GetToolboxToolsByToolboxIdParameters,
  GetToolByIdParameters,
  ReassignToolParameters,
  UpdateToolboxByIdParameters,
  UpdateToolByIdParameters,
} from './toolbox.service-type';

@Injectable()
export class ToolboxService {
  constructor(private readonly toolboxDomain: ToolboxDomain) {}

  public async createTool({ description, name, toolboxId }: CreateToolParameters) {
    return this.toolboxDomain.createTool({ description, name, toolboxId });
  }

  public async createToolbox({ name, tools }: CreateToolboxParameters) {
    const createdToolbox = await this.toolboxDomain.createToolbox({ name, tools });

    if (createdToolbox === ToolboxDomainError.toolboxWithThisNameAlreadyExist) {
      throw new BadRequestException(`Toolbox with name <<${name}>> already exist`);
    }

    return createdToolbox;
  }

  public async deleteToolById({ toolId, toolboxId }: DeleteToolByIdParameters) {
    const deleteResult = await this.toolboxDomain.deleteToolById({ toolId, toolboxId });

    if (deleteResult === ToolboxDomainError.toolNotFound) {
      throw new NotFoundException('Not found tool for deleting');
    }
  }

  public async deleteToolboxById({ toolboxId }: DeleteToolboxByIdParameters) {
    const deleteResult = await this.toolboxDomain.deleteToolboxById({ toolboxId });

    if (deleteResult === ToolboxDomainError.toolboxNotFound) {
      throw new NotFoundException('Not found toolbox for deleting');
    }
  }

  public async getToolById({ toolId, toolboxId }: GetToolByIdParameters) {
    return this.toolboxDomain.getToolById({ toolId, toolboxId });
  }

  public async getToolboxById({ toolboxId }: GetToolboxByIdParameters) {
    return this.toolboxDomain.getToolboxWithToolsById({ toolboxId });
  }

  public async getToolboxToolsByToolboxId({ toolboxId }: GetToolboxToolsByToolboxIdParameters) {
    return this.toolboxDomain.getToolboxTools({ toolboxId });
  }

  public async getToolboxes() {
    return this.toolboxDomain.getToolboxes();
  }

  public async reassignTool({ fromToolboxId, toToolboxId, toolId }: ReassignToolParameters) {
    const reassignedTool = await this.toolboxDomain.reassignTool({ fromToolboxId, toToolboxId, toolId });

    if (reassignedTool === ToolboxDomainError.toolNotFound) {
      throw new NotFoundException('Not found tool for reassigning');
    }

    return reassignedTool;
  }

  public async updateToolById({ description, name, toolId, toolboxId }: UpdateToolByIdParameters) {
    const updatedTool = await this.toolboxDomain.updateToolById({ description, name, toolId, toolboxId });

    if (updatedTool === ToolboxDomainError.toolNotFound) {
      throw new NotFoundException('Not found tool for updating');
    }

    return updatedTool;
  }

  public async updateToolboxById({ toolboxId, toolboxName }: UpdateToolboxByIdParameters) {
    const updatedToolbox = await this.toolboxDomain.updateToolboxById({ toolboxId, toolboxName });

    if (updatedToolbox === ToolboxDomainError.toolboxNotFound) {
      throw new NotFoundException('Not found toolbox for updating');
    }

    return updatedToolbox;
  }
}
