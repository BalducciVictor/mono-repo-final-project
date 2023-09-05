import { User } from 'src/domain/entities/user';
import UserModel from '../models/user.model';
import { CreateUserDto } from 'src/application/dto/User/create-user.dto';

export class UserRepository {
  async create(user: CreateUserDto): Promise<User> {
    const newUser = new UserModel(user);
    return await newUser;
  }
}
