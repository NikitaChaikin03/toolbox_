import { ToolDomainModel } from './tool.domain-model';

export interface ToolboxDomainModel {
  createdAt: Date;
  id: number;
  name: string;
  tools: ToolDomainModel[];
  updatedAt: Date;
}
