import { ConflictException, Injectable } from '@nestjs/common';

import { AccountTypeEnum } from '../../../database/enums/account-type.enum';
import { StatusTypeEnum } from '../../../database/enums/status-type.enum';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { AdRepository } from '../../repository/services/ad.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserResponseDto } from '../../user/models/dto/response/user.response.dto';
import { UserMapper } from '../../user/services/user.mapper';
import { BaseAdminManagerRequestDto } from '../models/dto/reques/base-admin-manager.request.dto';

@Injectable()
export class AdminManagerService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly adRepository: AdRepository,
  ) {}

  public async setNewRole(
    userData: IUserData,
    userId: string,
    dto: BaseAdminManagerRequestDto,
  ): Promise<UserResponseDto> {
    const userEntity = await this.userRepository.findByIdOrThrow(userId);
    if (userEntity.roles === dto.roles) {
      throw new ConflictException('User already has this role');
    }

    userEntity.roles = dto.roles;

    await this.userRepository.save(userEntity);

    return UserMapper.toResponseDto(userEntity);
  }

  public async setPremium(userId: string): Promise<void> {
    const userEntity = await this.userRepository.findByIdOrThrow(userId);
    if (userEntity.accountType === AccountTypeEnum.PREMIUM) {
      throw new ConflictException('User already has PREMIUM account');
    }

    userEntity.accountType = AccountTypeEnum.PREMIUM;

    await this.userRepository.save(userEntity);
  }

  public async deleteUser(userId: string): Promise<void> {
    const userEntity = await this.userRepository.findByIdOrThrow(userId);
    await this.userRepository.delete(userEntity);
  }

  public async blockAdvertisement(adId: string): Promise<void> {
    const entity = await this.adRepository.findByIdOrThrow(adId);
    if (entity.status === StatusTypeEnum.BLOCKED) {
      throw new ConflictException('Advertisement is already blocked');
    }
    entity.status = StatusTypeEnum.BLOCKED;
    await this.adRepository.save(entity);
  }

  public async unblockAdvertisement(adId: string): Promise<void> {
    const entity = await this.adRepository.findByIdOrThrow(adId);
    if (entity.status === StatusTypeEnum.ACTIVE) {
      throw new ConflictException('Advertisement is already active');
    }
    entity.status = StatusTypeEnum.ACTIVE;
    await this.adRepository.save(entity);
  }

  public async delete(adId: string): Promise<void> {
    const entity = await this.adRepository.findByIdOrThrow(adId);
    await this.adRepository.delete(entity);
  }
}
