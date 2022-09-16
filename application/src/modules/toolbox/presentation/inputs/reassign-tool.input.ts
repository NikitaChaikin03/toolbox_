import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReassignToolInput {
  @ApiProperty({ nullable: true, type: Number })
  @IsNumber()
  toToolboxId: number;
}
