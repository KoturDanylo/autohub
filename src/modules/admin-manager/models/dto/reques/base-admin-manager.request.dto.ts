import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum } from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { RolesEnum } from '../../../../../database/enums/roles.enum';

export class BaseAdminManagerRequestDto {
  @ApiProperty()
  @IsEnum(RolesEnum)
  @Transform(TransformHelper.toUpperCase)
  @Type(() => String)
  roles: RolesEnum;
}
