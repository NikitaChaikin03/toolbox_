import { ApiProperty } from '@nestjs/swagger';

import { ToolboxDto } from '../dtos';

export class GetToolboxesResult {
  @ApiProperty({ nullable: true, type: [ToolboxDto] })
  data?: ToolboxDto[];
}
