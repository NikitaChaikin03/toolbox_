import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateToolboxByIdInput {
  @ApiProperty({ nullable: true, type: String })
  @IsString()
  name: string;
}
