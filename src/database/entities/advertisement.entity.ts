import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { RegionsEnum } from '../enums/regions.enum';
import { StatusTypeEnum } from '../enums/status-type.enum';
import { TableNameEnum } from '../enums/table-name.enum';
import { CarEntity } from './car.entity';
import { BaseModel } from './models/base.model';
import { StatisticEntity } from './statistic.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.ADVERTISEMENT)
export class AdvertisementEntity extends BaseModel {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  body: string;

  @Column({
    type: 'enum',
    enum: StatusTypeEnum,
    default: StatusTypeEnum.INACTIVE,
  })
  status: StatusTypeEnum;

  @Column({ type: 'enum', enum: RegionsEnum })
  region: RegionsEnum;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.advertisements)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column()
  car_id: string;
  @OneToOne(() => CarEntity, (entity) => entity.advertisement)
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity;

  @OneToMany(() => StatisticEntity, (entity) => entity.advertisement)
  views?: StatisticEntity[];
}
