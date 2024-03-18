import { Module } from '@nestjs/common';

import { AdController } from './ad.controller';
import { AdService } from './services/ad.service';
import { CurrencyService } from './services/currency.service';

@Module({
  controllers: [AdController],
  providers: [AdService, CurrencyService],
  exports: [],
})
export class AdModule {}
