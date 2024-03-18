import { PickType } from '@nestjs/swagger';

import { BaseAdRequestDto } from './base-ad.request.dto';

export class UpdateAdDto extends PickType(BaseAdRequestDto, [
  'title',
  'body',
  'description',
  'color',
  'mileage',
  'price',
]) {}
