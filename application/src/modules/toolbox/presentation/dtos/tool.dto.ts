import { ApiProperty } from '@nestjs/swagger';

export class ToolDto {
  @ApiProperty({ nullable: false, type: Date })
  createdAt: Date;

  @ApiProperty({ nullable: false, type: String })
  description: string;

  @ApiProperty({ nullable: false, type: Number })
  readonly id!: number;

  @ApiProperty({ nullable: false, type: String })
  name: string;

  @ApiProperty({ nullable: false, type: Date })
  updatedAt: Date;
}
