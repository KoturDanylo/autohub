import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { AdEntity } from './ad.entity';
import { BaseModel } from './models/base.model';

@Entity(TableNameEnum.STATISTICS)
export class StatisticEntity extends BaseModel {
  @Column()
  ad_id: string;
  @ManyToOne(() => AdEntity, (entity) => entity.views)
  @JoinColumn({ name: 'ad_id' })
  ad?: AdEntity;
}
