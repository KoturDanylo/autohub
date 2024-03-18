import { PickType } from '@nestjs/swagger';

import { BaseAdvertisementRequestDto } from './base-advertisement.request.dto';

export class UpdateAdvertisementDto extends PickType(
  BaseAdvertisementRequestDto,
  ['title', 'body', 'description', 'color', 'mileage', 'price'],
) {}
