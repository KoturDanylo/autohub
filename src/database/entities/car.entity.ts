import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { CurrencyEnum } from '../enums/currency.enum';
import { TableNameEnum } from '../enums/table-name.enum';
import { AdEntity } from './ad.entity';
import { CarBrandEntity } from './car-brand.entity';
import { CarModelEntity } from './car-model.entity';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.CARS)
export class CarEntity extends BaseModel {
  @Column({ type: 'int' })
  year: number;

  @Column('text', { nullable: true })
  color?: string;

  @Column('int', { nullable: true })
  mileage?: number;

  @Column('int')
  price: number;

  @Column({
    type: 'enum',
    enum: CurrencyEnum,
    default: CurrencyEnum.UAH,
  })
  currency: CurrencyEnum;

  @Column('text', { nullable: true })
  image?: string;

  @Column()
  brand_id: string;
  @ManyToOne(() => CarBrandEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'brand_id' })
  car_brand?: CarBrandEntity;

  @Column()
  model_id: string;
  @ManyToOne(() => CarModelEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'model_id' })
  car_model?: CarModelEntity;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @OneToOne(() => AdEntity, (entity) => entity.car)
  ad?: AdEntity;
}
