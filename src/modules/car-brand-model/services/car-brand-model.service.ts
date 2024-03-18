import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CarBrandRepository } from '../../repository/services/car-brand.repository';
import { CarModelRepository } from '../../repository/services/car-model.repository';
import { BrandModelListRequestDto } from '../models/dto/request/brand-model-list.request.dto';
import { CreateBrandDto } from '../models/dto/request/create-brand.dto';
import { CreateModelDto } from '../models/dto/request/create-model.dto';
import { BrandResponseDto } from '../models/dto/response/brand.response.dto';
import { BrandListResponseDto } from '../models/dto/response/brand-list.response.dto';
import { ModelResponseDto } from '../models/dto/response/model.response.dto';
import { ModelListResponseDto } from '../models/dto/response/model-list.response.dto';
import { CarBrandModelMapper } from './car-brand-model.mapper';

@Injectable()
export class CarBrandModelService {
  constructor(
    private readonly carBrandRepository: CarBrandRepository,
    private readonly carModelRepository: CarModelRepository,
  ) {}

  public async createBrand(dto: CreateBrandDto): Promise<BrandResponseDto> {
    const brandEntity = await this.carBrandRepository.findOneBy({
      brand_name: dto.brand_name,
    });

    if (brandEntity) {
      throw new UnprocessableEntityException('This brand is already exist');
    }
    const newBrand = await this.carBrandRepository.save(
      this.carBrandRepository.create({ ...dto }),
    );
    return CarBrandModelMapper.brandToResponseDto(newBrand);
  }

  public async createModel(dto: CreateModelDto): Promise<ModelResponseDto> {
    const brandEntity = await this.carBrandRepository.findOneBy({
      brand_name: dto.brand_name,
    });

    if (!brandEntity) {
      throw new UnprocessableEntityException('You need to create brand first');
    }
    const modelEntity = await this.carModelRepository.findOneBy({
      brand_id: brandEntity.id,
      model_name: dto.model_name,
    });
    if (modelEntity) {
      throw new ConflictException('This model is already exist');
    }
    const entity = await this.carModelRepository.save(
      this.carModelRepository.create({
        model_name: dto.model_name,
        brand_id: brandEntity.id,
      }),
    );
    const newModel = await this.carModelRepository.findOneByWithBrand(
      entity.id,
      brandEntity.id,
    );
    return CarBrandModelMapper.modelToResponseDto(newModel);
  }

  public async getAllBrands(
    query: BrandModelListRequestDto,
  ): Promise<BrandListResponseDto> {
    const [entities, total] = await this.carBrandRepository.getAllBrands(query);
    return CarBrandModelMapper.brandToListResponseDto(entities, total, query);
  }

  public async getAllModels(
    query: BrandModelListRequestDto,
  ): Promise<ModelListResponseDto> {
    const [entities, total] = await this.carModelRepository.getAllModels(query);
    return CarBrandModelMapper.ModelsToListResponseDto(entities, total, query);
  }
}
