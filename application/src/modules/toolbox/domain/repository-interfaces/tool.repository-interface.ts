import { RepositoryInterface } from '@libs/ddd';

import { ToolDomainModel } from '../models';

export interface ToolRepositoryInterface extends RepositoryInterface<ToolDomainModel> {}
