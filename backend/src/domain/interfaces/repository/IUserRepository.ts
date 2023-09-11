import { CreateUserRequestDto } from "src/application/dto/User/Request/create-user-request.dto";
import { User } from "../../entities/user";
import { UpdateUserRequestDto } from "src/application/dto/User/Request/update-user-request.dto";
import { UserResponseDto } from "src/application/dto/User/Response/user-response.dto";

export abstract class IUserRepository {
  get: (userId: string) => Promise<UserResponseDto>;
  create: (createUserDto: CreateUserRequestDto) => Promise<UserResponseDto>;
  getByMail: (email: string) => Promise<User | null>;
  delete: (id: string) => Promise<void>;
  update: (
    id: string,
    updateUserDto: UpdateUserRequestDto
  ) => Promise<UserResponseDto | null>;
}
