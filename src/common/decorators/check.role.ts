import { SetMetadata } from '@nestjs/common';

export const CheckRole = (...role: string[]) => SetMetadata('role', role);
