import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
import { CarModelEntity } from '../../../database/entities/car-model.entity';
import { BrandModelListRequestDto } from '../models/dto/request/brand-model-list.request.dto';
import { BrandResponseDto } from '../models/dto/response/brand.response.dto';
import { BrandListResponseDto } from '../models/dto/response/brand-list.response.dto';
import { ModelResponseDto } from '../models/dto/response/model.response.dto';
import { ModelListResponseDto } from '../models/dto/response/model-list.response.dto';

export class CarBrandModelMapper {
  public static brandToResponseDto(
    carBrandEntity: CarBrandEntity,
  ): BrandResponseDto {
    return {
      id: carBrandEntity.id,
      brand_name: carBrandEntity.brand_name,
    };
  }

  public static modelToResponseDto(
    carModelEntity: CarModelEntity,
  ): ModelResponseDto {
    return {
      id: carModelEntity.id,
      model_name: carModelEntity.model_name,
      brand_name: carModelEntity.car_brand
        ? carModelEntity.car_brand.brand_name
        : null,
    };
  }

  public static brandToListResponseDto(
    entities: BrandResponseDto[],
    total: number,
    query: BrandModelListRequestDto,
  ): BrandListResponseDto {
    return {
      data: entities.map(this.brandToResponseDto),
      meta: {
        limit: query.limit,
        offset: query.offset,
        total,
      },
    };
  }

  public static ModelsToListResponseDto(
    entities: ModelResponseDto[],
    total: number,
    query: BrandModelListRequestDto,
  ): ModelListResponseDto {
    // const modelResponseDtoList: ModelResponseDto[] = entities.map((model) => ({
    //   id: model.id,
    //   model_name: model.model_name,
    //   brand_name: model?.brand.brand_name,
    // }));

    return {
      data: entities.map(this.modelToResponseDto),
      meta: {
        limit: query.limit,
        offset: query.offset,
        total,
      },
    };
  }
}
