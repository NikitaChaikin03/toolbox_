import { IsNumber, IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  APPLICATION_TOOLBOX_DATABASE_URL: string;

  @IsNumber()
  APPLICATION_TOOLBOX_PORT: number;
}
