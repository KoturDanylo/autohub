import { PickType } from '@nestjs/swagger';

import { BaseBrandModelRequestDto } from './base-brand-model.request.dto';

export class CreateModelDto extends PickType(BaseBrandModelRequestDto, [
  'brand_name',
  'model_name',
]) {}
