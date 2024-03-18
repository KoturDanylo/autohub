import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CheckRole } from '../../common/decorators/check.role';
import { RolesGuard } from '../../common/guards/role.guard';
import { RolesEnum } from '../../database/enums/roles.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { UserResponseDto } from '../user/models/dto/response/user.response.dto';
import { BaseAdminManagerRequestDto } from './models/dto/reques/base-admin-manager.request.dto';
import { AdminManagerService } from './services/admin-manager.service';

@ApiTags('Main tag for settings')
@CheckRole(RolesEnum.ADMIN, RolesEnum.MANAGER)
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('admin/manager')
export class AdminManagerController {
  constructor(private readonly adminManagerService: AdminManagerService) {}

  @ApiOperation({ summary: 'Set rol for user' })
  @Put(':userId')
  public async setNewRole(
    @CurrentUser() userData: IUserData,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() dto: BaseAdminManagerRequestDto,
  ): Promise<UserResponseDto> {
    return await this.adminManagerService.setNewRole(userData, userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Set premium account' })
  @Put('/premium:userId')
  async setPremium(@Param('userId') userId: string): Promise<void> {
    await this.adminManagerService.setPremium(userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.adminManagerService.deleteUser(userId);
  }
  @ApiOperation({ summary: 'Block ad' })
  @Put(':adId')
  async blockAdvertisement(@Param('adId') adId: string): Promise<void> {
    await this.adminManagerService.blockAdvertisement(adId);
  }

  @ApiOperation({ summary: 'Unblock ad' })
  @Patch(':adId')
  async unblockAdvertisement(@Param('adId') adId: string): Promise<void> {
    await this.adminManagerService.unblockAdvertisement(adId);
  }

  @ApiOperation({ summary: 'Delete ad' })
  @Delete(':adId')
  async delete(@Param('adId') adId: string): Promise<void> {
    await this.adminManagerService.delete(adId);
  }
}
