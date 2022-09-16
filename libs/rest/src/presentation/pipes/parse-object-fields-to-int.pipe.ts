import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseObjectFieldsToIntPipe implements PipeTransform {
  public async transform(object: Record<string, any>) {
    if (!object) {
      return object;
    }

    try {
      return Object.entries(object).reduce((accumulator, [key, value]) => {
        accumulator[key] = parseInt(value, 10);

        return accumulator;
      }, {});
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
