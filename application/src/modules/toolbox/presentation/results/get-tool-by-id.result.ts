import { ApiProperty } from '@nestjs/swagger';

import { ToolDto } from '../dtos';

export class GetToolByIdResult {
  @ApiProperty({ nullable: true, type: ToolDto })
  data?: ToolDto;
}
