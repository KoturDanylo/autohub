import { UserEntity } from '../../../database/entities/user.entity';
import { UserResponseDto } from '../models/dto/response/user.response.dto';

export class UserMapper {
  public static toResponseDto(userEntity: UserEntity): UserResponseDto {
    return {
      bio: userEntity.bio,
      email: userEntity.email,
      id: userEntity.id,
      image: userEntity.image,
      name: userEntity.name,
      accountType: userEntity.accountType,
      role: userEntity.roles,
    };
  }
}
