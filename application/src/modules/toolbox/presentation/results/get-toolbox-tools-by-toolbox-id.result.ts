import { ApiProperty } from '@nestjs/swagger';

import { ToolDto } from '../dtos';

export class GetToolboxToolsByToolboxIdResult {
  @ApiProperty({ nullable: true, type: [ToolDto] })
  data?: ToolDto[];
}
