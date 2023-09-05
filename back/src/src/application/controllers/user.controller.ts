import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { User } from "src/domain/entities/user";
import { CreateUserDto } from "../dto/User/create-user.dto";
import { CreateUserUseCase } from "../useCases/user/createUser.use-case";
import { GetUserUseCase } from "../useCases/user/getUser.use-case";
import { UpdateUserDto } from "../dto/User/update-user.dto";
import { UpdateUserUseCase } from "../useCases/user/updateUser.user-case";
import { DeleteUserUseCase } from "../useCases/user/deleteUser.use-case";

@Controller("users")
export default class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  @Post()
  async create(@Body() user: CreateUserDto, adminMail: string): Promise<User> {
    try {
      return await this.createUserUseCase.execute(user, adminMail);
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async get(@Param() userId: string): Promise<User> {
    try {
      return await this.getUserUseCase.execute(userId);
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete()
  async delete(@Param() userId: string, adminMail: string): Promise<void> {
    try {
      await this.deleteUserUseCase.execute(userId, adminMail);
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put()
  async update(
    @Body() user: UpdateUserDto,
    userId: string,
    adminMail: string
  ): Promise<User> {
    try {
      return await this.updateUserUseCase.execute(userId, user, adminMail);
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
