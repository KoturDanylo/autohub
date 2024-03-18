import { Module } from '@nestjs/common';

import { CarBrandModelController } from './car-brand-model.controller';
import { CarBrandModelService } from './services/car-brand-model.service';

@Module({
  controllers: [CarBrandModelController],
  providers: [CarBrandModelService],
  exports: [],
})
export class CarBrandModelModule {}
