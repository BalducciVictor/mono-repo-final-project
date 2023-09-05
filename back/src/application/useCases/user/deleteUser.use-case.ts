import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "src/application/dto/User/update-user.dto";
import { User } from "src/domain/entities/user";
import { IUserService } from "src/domain/interfaces/services/IUserService";

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userService: IUserService) {}

  async execute(userId: string, adminMail: string): Promise<void> {
    await this.userService.delete(userId, adminMail);
  }
}
