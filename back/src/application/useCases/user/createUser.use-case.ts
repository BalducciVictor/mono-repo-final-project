import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/application/dto/User/create-user.dto";
import { User } from "src/domain/entities/user";
import { IUserService } from "src/domain/interfaces/services/IUserService";

@Injectable()
export class CreateUserUseCase {
  constructor(private userService: IUserService) {}

  async execute(user: CreateUserDto, adminMail: string): Promise<User> {
    return await this.userService.create(user, adminMail);
  }
}
