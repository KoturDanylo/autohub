import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class BaseBrandModelRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.toLowerCase)
  @Type(() => String)
  brand_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.toLowerCase)
  @Type(() => String)
  model_name?: string;
}
