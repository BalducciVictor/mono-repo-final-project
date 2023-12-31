import { Injectable } from "@nestjs/common";
import { CreateUserRequestDto } from "../../../application/dto/User/Request/create-user-request.dto";
import { UserResponseDto } from "../../../application/dto/User/Response/user-response.dto";
import { UpdateUserRequestDto } from "../../../application/dto/User/Request/update-user-request.dto";
import { IUserService } from "../../../domain/interfaces/services/IUserService";
import { GetUserCompanyGroupResponseDto } from "../../../application/dto/Documentation/Response/get-user-company-group-response.dto";
import { ChapterResponseDto } from "src/application/dto/Chapter/Response/chapter-response.dto";

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

  async getUsersByCompany(companyId: string): Promise<Array<UserResponseDto>> {
    return await this.userService.getUsersByCompanyId(companyId);
  }

  async getUserGroup(userId: string): Promise<GetUserCompanyGroupResponseDto> {
    return await this.userService.getUserGroup(userId);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userService.delete(userId);
  }

  async createUser(user: CreateUserRequestDto): Promise<UserResponseDto> {
    return await this.userService.create(user);
  }

  async getAllChaptersByUserId(
    userId: string
  ): Promise<Array<ChapterResponseDto>> {
    return await this.userService.getAllByUserId(userId);
  }
}
