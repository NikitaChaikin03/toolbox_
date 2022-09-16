import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmptyString } from '@libs/rest';

export class CreateToolInput {
  @ApiProperty({ nullable: true, type: String })
  @IsNotEmptyString()
  description: string;

  @ApiProperty({ nullable: false, type: String })
  @IsNotEmptyString()
  name: string;
}
