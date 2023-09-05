import { Controller, Post, Body } from '@nestjs/common';
import { User } from 'src/domain/entities/user';
import { Context } from 'vm';
import { CreateUserDto } from '../dto/User/create-user.dto';
import { UserService } from '../../domain/services/user.service';

@Controller()
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.create(user);
  }
}
