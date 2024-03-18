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
import { MoreAdvertisementsAllowedGuard } from './guards/more-advertisements-allowed.guard';
import { AdvertisementListRequestDto } from './models/dto/request/advertisement-list.request.dto';
import { CreateAdvertisementDto } from './models/dto/request/create-advertisement.dto';
import { UpdateAdvertisementDto } from './models/dto/request/update-advertisement.dto';
import { AdvertisementResponseDto } from './models/dto/response/advertisement.response.dto';
import { AdvertisementListResponseDto } from './models/dto/response/advertisement-list.response.dto';
import { AdvertisementService } from './services/advertisement.service';

@ApiTags('Advertisement')
@Controller('advertisements')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @ApiBearerAuth()
  @CheckRole(RolesEnum.SELLER, RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UseGuards(BadWordsValidation, RolesGuard, MoreAdvertisementsAllowedGuard)
  @ApiOperation({
    summary:
      'Create advertisement. Allowed for users with SELLER, ADMIN MANAGER role',
  })
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateAdvertisementDto,
  ): Promise<AdvertisementResponseDto> {
    return await this.advertisementService.create(userData, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update advertisement' })
  @Put(':advertisementId')
  public async update(
    @Param('advertisementId', ParseUUIDPipe) advertisementId: string,
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateAdvertisementDto,
  ): Promise<AdvertisementResponseDto> {
    return await this.advertisementService.update(
      userData,
      dto,
      advertisementId,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get advertisement by id' })
  @Get(':advertisementId')
  public async getById(
    @Param('advertisementId', ParseUUIDPipe) advertisementId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<AdvertisementResponseDto> {
    return await this.advertisementService.getById(userData, advertisementId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all advertisements' })
  @Get()
  public async getAll(
    @CurrentUser() userData: IUserData,
    @Query() query: AdvertisementListRequestDto,
  ): Promise<AdvertisementListResponseDto> {
    return await this.advertisementService.getAll(userData, query);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete own advertisement' })
  @Delete(':advertisementId')
  public async delete(
    @Param('advertisementId', ParseUUIDPipe) advertisementId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.advertisementService.delete(userData, advertisementId);
  }
}
