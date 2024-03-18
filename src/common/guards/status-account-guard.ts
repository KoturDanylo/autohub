import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { AccountTypeEnum } from '../../database/enums/account-type.enum';

@Injectable()
export class StatusAccountGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();

    if (user.accountType === AccountTypeEnum.PREMIUM) {
      return true;
    }

    throw new ForbiddenException('Only for users with PREMIUM account');
  }
}
