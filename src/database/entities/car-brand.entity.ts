import { Column, Entity, OneToMany } from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { CarEntity } from './car.entity';
import { CarModelEntity } from './car-model.entity';
import { BaseModel } from './models/base.model';

@Entity(TableNameEnum.CAR_BRANDS)
export class CarBrandEntity extends BaseModel {
  @Column('text')
  brand_name: string;

  @OneToMany(() => CarModelEntity, (entity) => entity.car_brand)
  car_models?: CarModelEntity[];

  @OneToMany(() => CarEntity, (entity) => entity.car_brand)
  cars?: CarEntity[];
}
