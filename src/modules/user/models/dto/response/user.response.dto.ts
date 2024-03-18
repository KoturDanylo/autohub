import { RolesEnum } from '../../../../../database/enums/roles.enum';

export class UserResponseDto {
  id: string;

  name: string;

  bio: string;

  email: string;

  image: string;

  accountType: string;

  role: RolesEnum;
}
