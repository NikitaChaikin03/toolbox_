interface Tool {
  description: string;
  name: string;
}

export interface CreateToolParameters {
  description: string;
  name: string;
  toolboxId: number;
}

export interface CreateToolboxParameters {
  name: string;
  tools: Tool[];
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

export interface GetToolboxByIdParameters {
  toolboxId: number;
}

export interface GetToolboxToolsByToolboxIdParameters {
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
