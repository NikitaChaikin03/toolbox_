import { isNotEmpty, isString, registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsNotEmptyString(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'isNotEmptyString',
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: {
        defaultMessage: (validationArguments?: ValidationArguments): string => {
          return `${validationArguments.property} should not be an empty string`;
        },
        validate: (value: any): boolean => isString(value) && isNotEmpty(value.trim()),
      },
    });
  };
}
