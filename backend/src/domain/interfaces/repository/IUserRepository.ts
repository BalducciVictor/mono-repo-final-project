import { CreateUserRequestDto } from "src/application/dto/User/Request/create-user-request.dto";
import { UpdateUserRequestDto } from "src/application/dto/User/Request/update-user-request.dto";
import { UserResponseDto } from "src/application/dto/User/Response/user-response.dto";

export abstract class IUserRepository {
  get: (userId: string) => Promise<UserResponseDto>;
  getUsersByCompanyId: (companyId: string) => Promise<Array<UserResponseDto>>;
  create: (createUserDto: CreateUserRequestDto) => Promise<UserResponseDto>;
  getByMail: (email: string) => Promise<UserResponseDto | null>;
  delete: (id: string) => Promise<void>;
  update: (
    id: string,
    updateUserDto: UpdateUserRequestDto
  ) => Promise<UserResponseDto | null>;
}
