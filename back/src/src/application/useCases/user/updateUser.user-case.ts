import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "src/application/dto/User/update-user.dto";
import { User } from "src/domain/entities/user";
import { IUserService } from "src/domain/interfaces/services/IUserService";

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userService: IUserService) {}

  async execute(
    userId: string,
    updateUserDto: UpdateUserDto,
    adminMail: string
  ): Promise<User | null> {
    return await this.userService.update(userId, updateUserDto, adminMail);
  }
}
