import { ApiProperty } from '@nestjs/swagger';

import { SuccessDeleteResult } from '@libs/rest';

export class DeleteToolByIdResult {
  @ApiProperty({ nullable: true, type: SuccessDeleteResult })
  data?: SuccessDeleteResult;
}
