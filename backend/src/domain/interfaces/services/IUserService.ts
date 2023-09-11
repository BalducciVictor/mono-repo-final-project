import { CreateUserRequestDto } from "src/application/dto/User/Request/create-user-request.dto";
import { User } from "../../entities/user";
import { UpdateUserRequestDto } from "src/application/dto/User/Request/update-user-request.dto";
import { UserResponseDto } from "src/application/dto/User/Response/user-response.dto";

export abstract class IUserService {
  get: (userId: string) => Promise<UserResponseDto>;
  create: (
    createUserDto: CreateUserRequestDto,
    userCreatingMail: string
  ) => Promise<UserResponseDto>;
  update: (
    userId: string,
    updateUserDto: UpdateUserRequestDto,
    adminMail: string
  ) => Promise<UserResponseDto>;
  delete: (userId: string, adminMail: string) => Promise<void>;
  getByMail: (userMail: string) => Promise<User>;
}
