import { ApiProperty } from '@nestjs/swagger';

export class SuccessDeleteResult {
  @ApiProperty({ nullable: true, type: Boolean })
  success?: true;
}
