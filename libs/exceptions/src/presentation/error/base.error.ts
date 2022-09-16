import { ApiProperty } from '@nestjs/swagger';

import { ErrorFields } from './error-fields';

export class BaseError {
  @ApiProperty({ type: ErrorFields })
  error: ErrorFields;
}
