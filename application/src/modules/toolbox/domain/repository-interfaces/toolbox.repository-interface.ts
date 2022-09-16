import { RepositoryInterface } from '@libs/ddd';

import { ToolboxDomainModel } from '../models';

export interface ToolboxRepositoryInterface extends RepositoryInterface<ToolboxDomainModel> {
  findToolboxesWithTools(): Promise<ToolboxDomainModel[]>;
}
