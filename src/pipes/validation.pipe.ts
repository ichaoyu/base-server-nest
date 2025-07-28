import { MESSAGES } from '@/constants';
import { Injectable, PipeTransform, ArgumentMetadata, UnprocessableEntityException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

// 参数管道校验
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object, { stopAtFirstError: true });
    if (errors.length > 0) {
      const errorMsg = errors[0]?.constraints ? Object.values(errors[0].constraints)[0] : MESSAGES.UNPROCESSABLE_ENTITY;

      throw new UnprocessableEntityException(errorMsg);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
