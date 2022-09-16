import { BadRequestException, HttpException } from '@nestjs/common';

export const exceptionFactory = (): HttpException => {
  return new BadRequestException();
};
