import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { StatusTypeEnum } from '../../../database/enums/status-type.enum';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { AdRepository } from '../../repository/services/ad.repository';
import { CarRepository } from '../../repository/services/car.repository';
import { CarBrandRepository } from '../../repository/services/car-brand.repository';
import { CarModelRepository } from '../../repository/services/car-model.repository';
import { StatisticRepository } from '../../repository/services/statistic.repository';
import { AdListRequestDto } from '../models/dto/request/ad-list.request.dto';
import { BaseAdRequestDto } from '../models/dto/request/base-ad.request.dto';
import { UpdateAdDto } from '../models/dto/request/update-ad.dto';
import { AdResponseDto } from '../models/dto/response/ad.response.dto';
import { AdListResponseDto } from '../models/dto/response/ad-list.response.dto';
import { AdMapper } from './ad.mapper';
import { CurrencyService } from './currency.service';

@Injectable()
export class AdService {
  constructor(
    private readonly currencyService: CurrencyService,
    private readonly adRepository: AdRepository,
    private readonly carRepository: CarRepository,
    private readonly carBrandRepository: CarBrandRepository,
    private readonly carModelRepository: CarModelRepository,
    private readonly statisticRepository: StatisticRepository,
  ) {}

  public async create(
    userData: IUserData,
    dto: BaseAdRequestDto,
  ): Promise<AdResponseDto> {
    const {
      description,
      body,
      title,
      region,
      car_model,
      car_brand,
      currency,
      mileage,
      image,
      year,
      price,
      color,
    } = dto;
    const [brandEntity] = await Promise.all([
      this.carBrandRepository.findOneBy({
        brand_name: car_brand,
      }),
    ]);
    if (!brandEntity) {
      throw new UnprocessableEntityException('There is no such brand');
    }
    const [modelEntity] = await Promise.all([
      this.carModelRepository.findOneBy({
        brand_id: brandEntity.id,
        model_name: car_model,
      }),
    ]);
    if (!modelEntity) {
      throw new UnprocessableEntityException('There is no such model');
    }
    const newAdvertisement = {
      title,
      body,
      description,
      region,
      user_id: userData.userId,
    };
    const newCar = { currency, mileage, image, year, price, color };

    const carEntity = await this.carRepository.save(
      this.carRepository.create({
        ...newCar,
        brand_id: brandEntity.id,
        model_id: modelEntity.id,
        user_id: userData.userId,
      }),
    );

    const adEntity = await this.adRepository.save(
      this.adRepository.create({
        ...newAdvertisement,
        car_id: carEntity.id,
        status: StatusTypeEnum.ACTIVE,
      }),
    );

    return AdMapper.toResponseDto(adEntity, carEntity);
  }

  public async update(
    userData: IUserData,
    dto: UpdateAdDto,
    adId: string,
  ): Promise<AdResponseDto> {
    const { description, body, title, color, mileage, price } = dto;
    const adDto = { description, body, title };
    const carDto = { color, mileage, price };
    const adEntity = await this.adRepository.findOneBy({
      user_id: userData.userId,
      id: adId,
    });
    if (!adEntity) {
      throw new ConflictException('You are not aloud to update this ad');
    }
    const carEntity = await this.carRepository.findOneBy({
      id: adEntity.car_id,
    });
    await this.adRepository.save(this.adRepository.merge(adEntity, adDto));

    await this.carRepository.save(this.carRepository.merge(carEntity, carDto));
    return AdMapper.toResponseDto(adEntity, carEntity);
  }

  public async getById(
    userData: IUserData,
    adId: string,
  ): Promise<AdResponseDto> {
    const adEntity = await this.adRepository.getAdvertisementById(adId);
    if (adEntity.user_id !== userData.userId) {
      await this.statisticRepository.save(
        this.statisticRepository.create({ ad_id: adId }),
      );
    }
    const { currency, price } = adEntity.car;
    await this.currencyService.convertPriceToUAH(price, currency);
    return AdMapper.toResponseDtoById(adEntity);
  }

  public async getAll(
    userData: IUserData,
    query: AdListRequestDto,
  ): Promise<AdListResponseDto> {
    const [entities, total] = await this.adRepository.getAll(query);

    return AdMapper.ToListResponseDto(entities, total, query);
  }

  public async delete(userData: IUserData, adId: string): Promise<void> {
    const adEntity = await this.adRepository.findOneBy({
      user_id: userData.userId,
      id: adId,
    });
    if (!adEntity) {
      throw new ConflictException('You are not aloud delete this ad');
    }
    const carEntity = await this.carRepository.findOneBy({
      id: adEntity.car_id,
    });
    await this.adRepository.delete({ id: adId });

    await this.carRepository.delete({ id: carEntity.id });
  }
}
