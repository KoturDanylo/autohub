import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CheckRole } from '../../common/decorators/check.role';
import { RolesGuard } from '../../common/guards/role.guard';
import { RolesEnum } from '../../database/enums/roles.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { BadWordsValidation } from './guards/bad-words-validation.guard';
import { MoreAdvertisementsAllowedGuard } from './guards/more-ads-allowed.guard';
import { AdListRequestDto } from './models/dto/request/ad-list.request.dto';
import { CreateAdDto } from './models/dto/request/create-ad.dto';
import { UpdateAdDto } from './models/dto/request/update-ad.dto';
import { AdResponseDto } from './models/dto/response/ad.response.dto';
import { AdListResponseDto } from './models/dto/response/ad-list.response.dto';
import { AdService } from './services/ad.service';

@ApiTags('Ads')
@Controller('ad')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @ApiBearerAuth()
  @CheckRole(RolesEnum.SELLER, RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UseGuards(BadWordsValidation, RolesGuard, MoreAdvertisementsAllowedGuard)
  @ApiOperation({
    summary: 'Create ad',
  })
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateAdDto,
  ): Promise<AdResponseDto> {
    return await this.adService.create(userData, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update ad' })
  @Put(':adId')
  public async update(
    @Param('adId', ParseUUIDPipe) adId: string,
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateAdDto,
  ): Promise<AdResponseDto> {
    return await this.adService.update(userData, dto, adId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get ad by id' })
  @Get(':adId')
  public async getById(
    @Param('adId', ParseUUIDPipe) adId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<AdResponseDto> {
    return await this.adService.getById(userData, adId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all ads' })
  @Get()
  public async getAll(
    @CurrentUser() userData: IUserData,
    @Query() query: AdListRequestDto,
  ): Promise<AdListResponseDto> {
    return await this.adService.getAll(userData, query);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete ad' })
  @Delete(':adId')
  public async delete(
    @Param('adId', ParseUUIDPipe) adId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.adService.delete(userData, adId);
  }
}
