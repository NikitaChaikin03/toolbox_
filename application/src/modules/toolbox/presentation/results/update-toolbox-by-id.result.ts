import { ApiProperty, OmitType } from '@nestjs/swagger';

import { ToolboxDto } from '../dtos';

export class UpdateToolboxByIdResult {
  @ApiProperty({ nullable: true, type: OmitType(ToolboxDto, ['tools']) })
  data?: Omit<ToolboxDto, 'tools'>;
}
