import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateToolByIdInput {
  @ApiProperty({ nullable: true, type: String })
  @IsString()
  description: string;

  @ApiProperty({ nullable: true, type: String })
  @IsString()
  name: string;
}
