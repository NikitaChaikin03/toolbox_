import { ApiProperty } from '@nestjs/swagger';

export class ErrorFields {
  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: String })
  path: string;

  @ApiProperty({ type: Number })
  statusCode: number;
}
