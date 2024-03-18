import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AdEntity } from '../../../database/entities/ad.entity';
import { AdListRequestDto } from '../../ad/models/dto/request/ad-list.request.dto';

@Injectable()
export class AdRepository extends Repository<AdEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdEntity, dataSource.manager);
  }

  public async findByIdOrThrow(id: string): Promise<AdEntity> {
    const entity = await this.findOneBy({ id });
    if (!entity) {
      throw new UnprocessableEntityException('Advertisement not found');
    }
    return entity;
  }

  public async getAdvertisementById(adId: string): Promise<AdEntity> {
    const qb = this.createQueryBuilder('ad');
    qb.leftJoinAndSelect('ad.car', 'car');
    qb.where('ad.id = :adId');
    qb.setParameter('adId', adId);
    return await qb.getOne();
  }
  public async getAll(query: AdListRequestDto): Promise<[AdEntity[], number]> {
    const qb = this.createQueryBuilder('ad');
    qb.leftJoinAndSelect('ad.car', 'car');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
