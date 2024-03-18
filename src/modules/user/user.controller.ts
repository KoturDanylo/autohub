import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { UpdateUserDto } from './models/dto/request/update-user.dto';
import { UserResponseDto } from './models/dto/response/user.response.dto';
import { UserService } from './services/user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get your own account' })
  @Get('me')
  public async findMe(
    @CurrentUser() userData: IUserData,
  ): Promise<UserResponseDto> {
    return await this.userService.findMe(userData);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update your own account' })
  @Put('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateMe(userData, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change your own account as seller' })
  @Put('me/seller')
  public async becomeSeller(@CurrentUser() userData: IUserData): Promise<void> {
    await this.userService.becomeSeller(userData);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get public user account' })
  @Get(':userId')
  public async getPublicUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getPublicUser(userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete your own account' })
  @Delete(':userId')
  public async delete(
    @CurrentUser() userData: IUserData,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.userService.delete(userData, userId);
  }
}
