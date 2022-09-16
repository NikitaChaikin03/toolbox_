import { ApiProperty } from '@nestjs/swagger';

import { ToolDto } from '../dtos';

export class UpdateToolByIdResult {
  @ApiProperty({ nullable: true, type: ToolDto })
  data?: ToolDto;
}
