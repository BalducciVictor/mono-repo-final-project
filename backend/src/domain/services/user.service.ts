import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserRequestDto } from "src/application/dto/User/Request/create-user-request.dto";
import { IUserService } from "../interfaces/services/IUserService";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { UpdateUserRequestDto } from "src/application/dto/User/Request/update-user-request.dto";
import * as bcrypt from "bcryptjs";
import { UserResponseDto } from "src/application/dto/User/Response/user-response.dto";

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async create(
    createUserDto: CreateUserRequestDto
  ): Promise<UserResponseDto> {
    if ((await this.userRepository.getByMail(createUserDto.email)) != null)
      throw new ConflictException(`This user already exist`);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser: CreateUserRequestDto = {
      ...createUserDto,
      password: hashedPassword,
    };

    return await this.userRepository.create(newUser);
  }

  public async get(userId: string): Promise<UserResponseDto> {
    const existingUser: UserResponseDto = await this.userRepository.get(userId);
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }

    return await this.userRepository.get(userId);
  }

  public async getByMail(userMail: string): Promise<UserResponseDto> {
    const existingUser: UserResponseDto = await this.userRepository.getByMail(
      userMail
    );
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }

    return existingUser;
  }

  public async update(
    userId: string,
    updateUserDto: UpdateUserRequestDto
  ): Promise<UserResponseDto> {
    const existingUser: UserResponseDto = await this.userRepository.get(userId);
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }

    return await this.userRepository.update(userId, updateUserDto);
  }

  public async delete(userId: string): Promise<void> {
    const existingUser: UserResponseDto = await this.userRepository.get(userId);
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }

    await this.userRepository.delete(userId);
  }
}
