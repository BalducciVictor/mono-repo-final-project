import { CreateUserDto } from "src/application/dto/User/create-user-request.dto";
import { User } from "../../entities/user";
import { UpdateUserDto } from "src/application/dto/User/update-user-request.dto";

export abstract class IUserRepository {
  get: (userId: string) => Promise<User>;
  create: (createUserDto: CreateUserDto) => Promise<User>;
  getByMail: (email: string) => Promise<User | null>;
  delete: (id: string) => Promise<void>;
  update: (id: string, updateUserDto: UpdateUserDto) => Promise<User | null>;
}
