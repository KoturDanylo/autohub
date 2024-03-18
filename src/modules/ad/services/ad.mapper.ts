import { AdEntity } from '../../../database/entities/ad.entity';
import { CarEntity } from '../../../database/entities/car.entity';
import { AdListRequestDto } from '../models/dto/request/ad-list.request.dto';
import { AdResponseDto } from '../models/dto/response/ad.response.dto';
import { AdListResponseDto } from '../models/dto/response/ad-list.response.dto';

export class AdMapper {
  public static toResponseDto(
    adEntity: AdEntity,
    carEntity: CarEntity,
  ): AdResponseDto {
    return {
      ad_id: adEntity.id,
      title: adEntity.title,
      description: adEntity.description,
      body: adEntity.description,
      status: adEntity.status,
      region: adEntity.region,
      user_id: adEntity.user_id,
      car: {
        car_id: carEntity.id,
        year: carEntity.year,
        color: carEntity.color,
        mileage: carEntity.mileage,
        price: carEntity.price,
        currency: carEntity.currency,
        image: carEntity.image,
      },
    };
  }

  public static toResponseDtoById(adEntity: AdEntity): AdResponseDto {
    return {
      ad_id: adEntity.id,
      title: adEntity.title,
      description: adEntity.description,
      body: adEntity.description,
      status: adEntity.status,
      region: adEntity.region,
      user_id: adEntity.user_id,
      car: adEntity.car
        ? {
            car_id: adEntity.car.id,
            year: adEntity.car.year,
            color: adEntity.car.color,
            mileage: adEntity.car.mileage,
            price: adEntity.car.price,
            currency: adEntity.car.currency,
            image: adEntity.car.image,
          }
        : null,
    };
  }

  public static ToListResponseDto(
    entities: AdEntity[],
    total: number,
    query: AdListRequestDto,
  ): AdListResponseDto {
    return {
      data: entities.map(this.toResponseDtoById),
      meta: {
        limit: query.limit,
        offset: query.offset,
        total,
      },
    };
  }
}
