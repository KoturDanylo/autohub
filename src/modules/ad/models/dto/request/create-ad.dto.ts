import { PickType } from '@nestjs/swagger';

import { BaseAdRequestDto } from './base-ad.request.dto';

export class CreateAdDto extends PickType(BaseAdRequestDto, [
  'title',
  'body',
  'description',
  'color',
  'mileage',
  'price',
  'image',
  'car_brand',
  'car_model',
  'currency',
  'region',
  'year',
]) {}
