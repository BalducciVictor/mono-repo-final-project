import { CreateUserDto } from "src/application/dto/User/create-user-request.dto";
import { User } from "../../entities/user";
import { UpdateUserDto } from "src/application/dto/User/update-user-request.dto";

export abstract class IUserService {
  get: (userId: string) => Promise<User>;
  create: (
    createUserDto: CreateUserDto,
    userCreatingMail: string
  ) => Promise<User>;
  update: (
    userId: string,
    updateUserDto: UpdateUserDto,
    adminMail: string
  ) => Promise<User>;
  delete: (userId: string, adminMail: string) => Promise<void>;
  getByMail: (userMail: string) => Promise<User>;
}
