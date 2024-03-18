import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { regexConstant } from '../../../../../constants/regex.constants';
import { AccountTypeEnum } from '../../../../../database/enums/account-type.enum';
import { RolesEnum } from '../../../../../database/enums/roles.enum';

export class BaseUserRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 300)
  bio?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 3000)
  image?: string;

  @ApiProperty({
    default: 'test@gmail.com',
    description: 'This field should be a valid email address.',
  })
  @IsString()
  @Length(0, 300)
  @Matches(regexConstant.EMAIL)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  email: string;

  @IsOptional()
  @IsString()
  @Length(0, 300)
  roles: RolesEnum;

  @IsOptional()
  @IsString()
  @Length(0, 300)
  accountType: AccountTypeEnum;

  @ApiProperty({
    default: 'pasPas12!@',
    description:
      'This field should contain at least 8 characters, including at least one letter, one number, and one special character (@, $, !, %, *, _, #, ?, &).',
  })
  @IsString()
  @Length(0, 300)
  @Matches(regexConstant.PASSWORD)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  password: string;
}
