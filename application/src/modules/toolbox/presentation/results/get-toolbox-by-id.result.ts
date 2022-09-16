import { ApiProperty } from '@nestjs/swagger';

import { ToolboxDto } from '../dtos';

export class GetToolboxByIdResult {
  @ApiProperty({ nullable: true, type: ToolboxDto })
  data?: ToolboxDto;
}
