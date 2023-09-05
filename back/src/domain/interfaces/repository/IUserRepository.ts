import { CreateUserDto } from "src/application/dto/User/create-user.dto";
import { User } from "../../entities/user";
import { UpdateUserDto } from "src/application/dto/User/update-user.dto";

export interface IUserRepository {
  get(userId: string): Promise<User>;
  create(createUserDto: CreateUserDto): Promise<User>;
  getByMail(email: string): Promise<User>;
  delete(id: string): Promise<void>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<User | null>;
}
