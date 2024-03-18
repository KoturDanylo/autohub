import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarModelEntity } from '../../../database/entities/car-model.entity';
import { BrandModelListRequestDto } from '../../car-brand-model/models/dto/request/brand-model-list.request.dto';

@Injectable()
export class CarModelRepository extends Repository<CarModelEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarModelEntity, dataSource.manager);
  }
  public async getAllModels(
    query: BrandModelListRequestDto,
  ): Promise<[CarModelEntity[], number]> {
    const qb = this.createQueryBuilder('model');
    qb.leftJoinAndSelect('model.car_brand', 'brand');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }

  public async findOneByWithBrand(
    modelId: string,
    brandId: string,
  ): Promise<CarModelEntity> {
    const qb = this.createQueryBuilder('model');
    qb.andWhere('model.id = :modelId');
    qb.leftJoinAndSelect('model.car_brand', 'brand');
    qb.andWhere('brand.id = :brandId');
    qb.setParameter('modelId', modelId);
    qb.setParameter('brandId', brandId);
    return await qb.getOne();
  }
}
