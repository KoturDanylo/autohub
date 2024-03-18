import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { CarEntity } from './car.entity';
import { CarBrandEntity } from './car-brand.entity';
import { BaseModel } from './models/base.model';

@Entity(TableNameEnum.CAR_MODELS)
export class CarModelEntity extends BaseModel {
  @Column('text')
  model_name: string;

  @Column()
  brand_id: string;
  @ManyToOne(() => CarBrandEntity, (entity) => entity.car_models)
  @JoinColumn({ name: 'brand_id' })
  car_brand?: CarBrandEntity;

  @OneToMany(() => CarEntity, (entity) => entity.car_model)
  cars?: CarEntity[];
}
