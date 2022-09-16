import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmptyString } from '@libs/rest';

import { CreateToolInput } from './create-tool.input';

export class CreateToolboxInput {
  @ApiProperty({ nullable: true, type: String })
  @IsNotEmptyString()
  name: string;

  @ApiProperty({ nullable: true, type: [CreateToolInput] })
  tools: CreateToolInput[];
}
