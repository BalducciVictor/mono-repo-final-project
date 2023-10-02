import { Injectable } from "@nestjs/common";
import { CreateUserRequestDto } from "src/application/dto/User/Request/create-user-request.dto";
import { UserResponseDto } from "src/application/dto/User/Response/user-response.dto";
import { UpdateUserRequestDto } from "src/application/dto/User/Request/update-user-request.dto";
import { IUserService } from "../../../domain/interfaces/services/IUserService";

@Injectable()
export class UserUseCase {
  constructor(private readonly userService: IUserService) {}

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserRequestDto
  ): Promise<UserResponseDto | null> {
    return await this.userService.update(userId, updateUserDto);
  }

  async getUser(userId: string): Promise<UserResponseDto> {
    return await this.userService.get(userId);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userService.delete(userId);
  }

  async createUser(user: CreateUserRequestDto): Promise<UserResponseDto> {
    return await this.userService.create(user);
  }
}
