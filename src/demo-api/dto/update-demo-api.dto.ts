import { PartialType } from '@nestjs/mapped-types';
import { CreateDemoApiDto } from './create-demo-api.dto';

export class UpdateDemoApiDto extends PartialType(CreateDemoApiDto) {}
