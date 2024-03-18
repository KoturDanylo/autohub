import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
import { BrandModelListRequestDto } from '../../car-brand-model/models/dto/request/brand-model-list.request.dto';
import { BrandResponseDto } from '../../car-brand-model/models/dto/response/brand.response.dto';

@Injectable()
export class CarBrandRepository extends Repository<CarBrandEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarBrandEntity, dataSource.manager);
  }
  public async getAllBrands(
    query: BrandModelListRequestDto,
  ): Promise<[BrandResponseDto[], number]> {
    const qb = this.createQueryBuilder('brands');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
