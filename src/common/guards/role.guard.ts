import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RolesEnum } from '../../database/enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
    const request = context.switchToHttp().getRequest();
    let userTypeAllowed = this.reflector.get<RolesEnum[]>(
      'role',
      context.getHandler(),
    );
    if (!userTypeAllowed) {
      userTypeAllowed = this.reflector.get<RolesEnum[]>(
        'role',
        context.getClass(),
      );
      if (!userTypeAllowed) {
        return true;
      }
    }
    const userRole = request.user.role;
    if (!userRole || !userTypeAllowed.includes(userRole)) {
      throw new HttpException(
        'Access denied. Depending on your role',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
