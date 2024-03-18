import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { S3Service } from './services/s3.service';
import { imageFileFilter } from './utils/file-upload.utils';
import { photoConfig } from './utils/photo.config';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('car/:carId/photo')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('photo', {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: photoConfig.MAX_SIZE,
      },
    }),
  )
  async uploadCarPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param(':carId') carId: string,
  ) {
    const urlPhoto = await this.s3Service.uploadCarPhoto(file, carId);
    return { urlPhoto };
  }

  @Delete('car/:carId/photo')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCarPhoto(@Param(':carId') carId: string) {
    await this.s3Service.deleteCarPhoto(carId);
  }
}
