import { Injectable } from "@nestjs/common";
import { CreateUserRequestDto } from "src/application/dto/User/Request/create-user-request.dto";
import { UserResponseDto } from "src/application/dto/User/Response/user-response.dto";
import { UpdateUserRequestDto } from "src/application/dto/User/Request/update-user-request.dto";
import { User } from "src/domain/entities/user";
import { IUserService } from "src/domain/interfaces/services/IUserService";

@Injectable()
export class UserUseCase {
  constructor(private readonly userService: IUserService) {}

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserRequestDto,
    adminMail: string
  ): Promise<UserResponseDto | null> {
    return await this.userService.update(userId, updateUserDto, adminMail);
  }

  async getUser(userId: string): Promise<UserResponseDto> {
    return await this.userService.get(userId);
  }

  async deleteUser(userId: string, adminMail: string): Promise<void> {
    await this.userService.delete(userId, adminMail);
  }

  async createUser(
    user: CreateUserRequestDto,
    adminMail: string
  ): Promise<UserResponseDto> {
    return await this.userService.create(user, adminMail);
  }
}
