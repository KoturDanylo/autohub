import { PickType } from '@nestjs/swagger';

import { BaseBrandModelRequestDto } from './base-brand-model.request.dto';

export class CreateBrandDto extends PickType(BaseBrandModelRequestDto, [
  'brand_name',
]) {}
