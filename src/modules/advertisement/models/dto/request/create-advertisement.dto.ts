import { PickType } from '@nestjs/swagger';

import { BaseAdvertisementRequestDto } from './base-advertisement.request.dto';

export class CreateAdvertisementDto extends PickType(
  BaseAdvertisementRequestDto,
  [
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
  ],
) {}
