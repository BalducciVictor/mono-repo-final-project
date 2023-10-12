import { CreateUserRequestDto } from "src/application/dto/User/Request/create-user-request.dto";
import { UpdateUserRequestDto } from "src/application/dto/User/Request/update-user-request.dto";
import { GetUserCompanyGroupResponseDto } from "src/application/dto/Documentation/Response/get-user-company-group-response.dto";
import { UserResponseDto } from "src/application/dto/User/Response/user-response.dto";
import { ChapterResponseDto } from "src/application/dto/Chapter/Response/chapter-response.dto";

export abstract class IUserService {
  get: (userId: string) => Promise<UserResponseDto>;
  getUsersByCompanyId: (companyId: string) => Promise<Array<UserResponseDto>>;
  getUserGroup: (userId: string) => Promise<GetUserCompanyGroupResponseDto>;
  create: (createUserDto: CreateUserRequestDto) => Promise<UserResponseDto>;
  update: (
    userId: string,
    updateUserDto: UpdateUserRequestDto
  ) => Promise<UserResponseDto>;
  delete: (userId: string) => Promise<void>;
  getByMail: (userMail: string) => Promise<UserResponseDto>;
  getAllByUserId: (userId: string) => Promise<Array<ChapterResponseDto>>;
}
