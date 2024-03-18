import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { BrandModelListRequestDto } from './models/dto/request/brand-model-list.request.dto';
import { CreateBrandDto } from './models/dto/request/create-brand.dto';
import { CreateModelDto } from './models/dto/request/create-model.dto';
import { BrandResponseDto } from './models/dto/response/brand.response.dto';
import { BrandListResponseDto } from './models/dto/response/brand-list.response.dto';
import { ModelResponseDto } from './models/dto/response/model.response.dto';
import { ModelListResponseDto } from './models/dto/response/model-list.response.dto';
import { CarBrandModelService } from './services/car-brand-model.service';

@ApiTags('Brand/model')
@Controller('brands')
export class CarBrandModelController {
  constructor(private readonly carBrandModelService: CarBrandModelService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new brand  name' })
  @Post()
  public async createBrand(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateBrandDto,
  ): Promise<BrandResponseDto> {
    return await this.carBrandModelService.createBrand(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new model name according to brand name' })
  @Post('/model')
  public async createModel(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateModelDto,
  ): Promise<ModelResponseDto> {
    return await this.carBrandModelService.createModel(dto);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all brands' })
  @Get()
  public async getAllBrands(
    @Query() query: BrandModelListRequestDto,
  ): Promise<BrandListResponseDto> {
    return await this.carBrandModelService.getAllBrands(query);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all models' })
  @Get('/models')
  public async getAllModels(
    @Query() query: BrandModelListRequestDto,
  ): Promise<ModelListResponseDto> {
    return await this.carBrandModelService.getAllModels(query);
  }
}
