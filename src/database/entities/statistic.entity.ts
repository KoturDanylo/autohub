import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { AdvertisementEntity } from './advertisement.entity';
import { BaseModel } from './models/base.model';

@Entity(TableNameEnum.STATISTICS)
export class StatisticEntity extends BaseModel {
  @Column()
  advertisement_id: string;
  @ManyToOne(() => AdvertisementEntity, (entity) => entity.views)
  @JoinColumn({ name: 'advertisement_id' })
  advertisement?: AdvertisementEntity;
}
