import { Injectable } from "@nestjs/common";
import { User } from "src/domain/entities/user";
import { IUserService } from "src/domain/interfaces/services/IUserService";

@Injectable()
export class GetUserUseCase {
  constructor(private userService: IUserService) {}

  async execute(userId: string): Promise<User> {
    return await this.userService.get(userId);
  }
}
