import { ToolboxDomainModel, ToolDomainModel } from './models';

export interface CreateToolParameters extends Omit<ToolDomainModel, 'id' | 'createdAt' | 'updatedAt'> {}

export interface CreateToolboxParameters extends Omit<ToolboxDomainModel, 'id' | 'createdAt' | 'updatedAt' | 'tools'> {
  tools: Omit<ToolDomainModel, 'id' | 'createdAt' | 'updatedAt' | 'toolboxId'>[];
}

export interface DeleteToolByIdParameters {
  toolId: number;
  toolboxId: number;
}

export interface DeleteToolboxByIdParameters {
  toolboxId: number;
}

export interface GetToolByIdParameters {
  toolId: number;
  toolboxId: number;
}

export interface GetToolboxToolsParameters {
  toolboxId: number;
}

export interface GetToolboxWithToolsByIdParameters {
  toolboxId: number;
}

export interface ReassignToolParameters {
  fromToolboxId: number;
  toToolboxId: number;
  toolId: number;
}

export interface UpdateToolByIdParameters {
  description: string;
  name: string;
  toolId: number;
  toolboxId: number;
}

export interface UpdateToolboxByIdParameters {
  toolboxId: number;
  toolboxName: string;
}
