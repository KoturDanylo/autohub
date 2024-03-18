import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { MinioModule } from 'nestjs-minio-client';

import getConfigs from '../../configs/config';
import { S3Controller } from './s3.controller';
import { S3Service } from './services/s3.service';

dotenv.config({ path: './environments/local.env' });

const s3Config = getConfigs().s3;
@Module({
  imports: [
    ConfigModule.forRoot(),
    MinioModule.register({
      endPoint: s3Config.s3Endpoint,
      port: 9000,
      accessKey: s3Config.accessKeyId,
      secretKey: s3Config.secretAccessKey,
      useSSL: process.env.MINIO_USE_SSL === 'true',
    }),
  ],
  controllers: [S3Controller],
  providers: [S3Service],
})
export class S3Module {}
