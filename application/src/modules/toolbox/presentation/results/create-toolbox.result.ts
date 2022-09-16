import { ApiProperty } from '@nestjs/swagger';

import { ToolboxDto } from '../dtos';

export class CreateToolboxResult {
  @ApiProperty({ nullable: true, type: ToolboxDto })
  data?: ToolboxDto;
}
