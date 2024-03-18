import { Module } from '@nestjs/common';

import { AdvertisementController } from './advertisement.controller';
import { AdvertisementService } from './services/advertisement.service';
import { CurrencyService } from './services/currency.service';

@Module({
  controllers: [AdvertisementController],
  providers: [AdvertisementService, CurrencyService],
  exports: [],
})
export class AdvertisementModule {}
