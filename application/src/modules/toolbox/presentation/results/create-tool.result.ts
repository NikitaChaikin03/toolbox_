import { ApiProperty } from '@nestjs/swagger';

import { ToolDto } from '../dtos';

export class CreateToolResult {
  @ApiProperty({ nullable: true, type: ToolDto })
  data?: ToolDto;
}
