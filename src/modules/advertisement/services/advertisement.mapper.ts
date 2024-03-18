import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { CarEntity } from '../../../database/entities/car.entity';
import { AdvertisementListRequestDto } from '../models/dto/request/advertisement-list.request.dto';
import { AdvertisementResponseDto } from '../models/dto/response/advertisement.response.dto';
import { AdvertisementListResponseDto } from '../models/dto/response/advertisement-list.response.dto';

export class AdvertisementMapper {
  public static toResponseDto(
    advertisementEntity: AdvertisementEntity,
    carEntity: CarEntity,
  ): AdvertisementResponseDto {
    return {
      advertisement_id: advertisementEntity.id,
      title: advertisementEntity.title,
      description: advertisementEntity.description,
      body: advertisementEntity.description,
      status: advertisementEntity.status,
      region: advertisementEntity.region,
      user_id: advertisementEntity.user_id,
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

  public static toResponseDtoById(
    advertisementEntity: AdvertisementEntity,
  ): AdvertisementResponseDto {
    return {
      advertisement_id: advertisementEntity.id,
      title: advertisementEntity.title,
      description: advertisementEntity.description,
      body: advertisementEntity.description,
      status: advertisementEntity.status,
      region: advertisementEntity.region,
      user_id: advertisementEntity.user_id,
      car: advertisementEntity.car
        ? {
            car_id: advertisementEntity.car.id,
            year: advertisementEntity.car.year,
            color: advertisementEntity.car.color,
            mileage: advertisementEntity.car.mileage,
            price: advertisementEntity.car.price,
            currency: advertisementEntity.car.currency,
            image: advertisementEntity.car.image,
          }
        : null,
    };
  }

  public static ToListResponseDto(
    entities: AdvertisementEntity[],
    total: number,
    query: AdvertisementListRequestDto,
  ): AdvertisementListResponseDto {
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
