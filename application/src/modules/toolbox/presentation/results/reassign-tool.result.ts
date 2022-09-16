import { ApiProperty } from '@nestjs/swagger';

import { ToolDto } from '../dtos';

export class ReassignToolResult {
  @ApiProperty({ nullable: true, type: ToolDto })
  data?: ToolDto;
}
