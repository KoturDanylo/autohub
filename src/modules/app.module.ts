import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/config';
import { AdModule } from './ad/ad.module';
import { AdminManagerModule } from './admin-manager/admin-manager.module';
import { AuthModule } from './auth/auth.module';
import { CarBrandModelModule } from './car-brand-model/car-brand-model.module';
import { PostgresModule } from './postgres/postgres.module';
import { RedisModule } from './redis/redis.module';
import { RepositoryModule } from './repository/repository.module';
import { S3Module } from './s3/s3.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PostgresModule,
    RedisModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    CarBrandModelModule,
    AdModule,
    S3Module,
    AdminManagerModule,
    RepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
