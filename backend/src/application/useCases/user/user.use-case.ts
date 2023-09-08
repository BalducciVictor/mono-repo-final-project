import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/application/dto/User/create-user-request.dto";
import { UpdateUserDto } from "src/application/dto/User/update-user-request.dto";
import { User } from "src/domain/entities/user";
import { IUserService } from "src/domain/interfaces/services/IUserService";

@Injectable()
export class UserUseCase {
  constructor(private readonly userService: IUserService) {}

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
    adminMail: string
  ): Promise<User | null> {
    return await this.userService.update(userId, updateUserDto, adminMail);
  }

  async getUser(userId: string): Promise<User> {
    return await this.userService.get(userId);
  }

  async deleteUser(userId: string, adminMail: string): Promise<void> {
    await this.userService.delete(userId, adminMail);
  }

  async createUser(user: CreateUserDto, adminMail: string): Promise<User> {
    return await this.userService.create(user, adminMail);
  }
}
