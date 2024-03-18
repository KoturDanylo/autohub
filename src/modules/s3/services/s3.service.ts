import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MinioService } from 'nestjs-minio-client';
import { join } from 'path';

import { Config, S3Config } from '../../../configs/config.type';
import { CarRepository } from '../../repository/services/car.repository';

@Injectable()
export class S3Service {
  constructor(
    private readonly minioService: MinioService,
    private readonly carRepository: CarRepository,
    private readonly configService: ConfigService<Config>,
  ) {}

  async uploadFile(file: Express.Multer.File, carId: string): Promise<string> {
    const filePath = this.buildPath(file.originalname, carId);
    const s3Config = this.configService.get<S3Config>('s3');
    try {
      const { bucketName } = s3Config;
      await this.minioService.client.putObject(
        bucketName,
        filePath,
        file.mimetype,
        file.size,
        // objectAcl,
      );
      return filePath;
    } catch (error) {
      // console.error('Error uploading file to MinIO:', error);
      throw error;
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    const s3Config = this.configService.get<S3Config>('s3');
    try {
      const { bucketName } = s3Config;
      await this.minioService.client.removeObject(bucketName, filePath);
    } catch (error) {
      // console.error('Error deleting file from MinIO:', error);
      throw error;
    }
  }

  async uploadCarPhoto(
    file: Express.Multer.File,
    carId: string,
  ): Promise<string> {
    const s3Config = this.configService.get<S3Config>('s3');
    const filePath = await this.uploadFile(file, carId);
    const { bucketPath } = s3Config;
    const urlPhoto = `${bucketPath}${filePath}`;
    const car = await this.carRepository.findOneBy({ id: carId });
    car.image = urlPhoto;
    await this.carRepository.save(car);
    return urlPhoto;
  }

  async deleteCarPhoto(carId: string): Promise<void> {
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car || !car.image) {
      throw new NotFoundException('Car photo not found');
    }

    const s3Config = this.configService.get<S3Config>('s3');
    const { bucketPath } = s3Config;
    const filePath = car.image.replace(bucketPath, '');
    await this.deleteFile(filePath);
    car.image = null;
    await this.carRepository.save(car);
  }

  private buildPath(fileName: string, carId: string): string {
    return join('cars', carId, fileName);
  }
}
