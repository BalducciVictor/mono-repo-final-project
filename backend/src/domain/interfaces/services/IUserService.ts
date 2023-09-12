import { CreateUserRequestDto } from "src/application/dto/User/Request/create-user-request.dto";
import { UpdateUserRequestDto } from "src/application/dto/User/Request/update-user-request.dto";
import { UserResponseDto } from "src/application/dto/User/Response/user-response.dto";

export abstract class IUserService {
  get: (userId: string) => Promise<UserResponseDto>;
  create: (createUserDto: CreateUserRequestDto) => Promise<UserResponseDto>;
  update: (
    userId: string,
    updateUserDto: UpdateUserRequestDto
  ) => Promise<UserResponseDto>;
  delete: (userId: string) => Promise<void>;
  getByMail: (userMail: string) => Promise<UserResponseDto>;
}
