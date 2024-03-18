import { Global, Module } from '@nestjs/common';

import { AdRepository } from './services/ad.repository';
import { CarRepository } from './services/car.repository';
import { CarBrandRepository } from './services/car-brand.repository';
import { CarModelRepository } from './services/car-model.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { StatisticRepository } from './services/statistic.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  UserRepository,
  StatisticRepository,
  RefreshTokenRepository,
  CarModelRepository,
  CarBrandRepository,
  CarRepository,
  AdRepository,
];
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
