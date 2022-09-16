import { ApiProperty } from '@nestjs/swagger';

import { ToolDto } from './tool.dto';

export class ToolboxDto {
  @ApiProperty({ nullable: false, type: Date })
  createdAt: Date;

  @ApiProperty({ nullable: false, type: Number })
  readonly id!: number;

  @ApiProperty({ nullable: false, type: String })
  name: string;

  @ApiProperty({ nullable: false, type: [ToolDto] })
  tools: ToolDto[];

  @ApiProperty({ nullable: false, type: Date })
  updatedAt: Date;
}
