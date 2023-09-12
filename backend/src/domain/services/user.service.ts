import { Injectable } from "@nestjs/common";
import { CreateUserRequestDto } from "src/application/dto/User/Request/create-user-request.dto";
import { User } from "../entities/user";
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
    //const adminUser: User = await this.userRepository.getByMail(adminMail);
    //if (adminUser.role !== "ADMIN") throw new Error(`This user is not ADMIN`);
    if ((await this.userRepository.getByMail(createUserDto.email)) != null)
      throw new Error(`This user already exist`);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser: CreateUserRequestDto = {
      ...createUserDto,
      password: hashedPassword,
    };

    return await this.userRepository.create(newUser);
  }

  public async get(userId: string): Promise<UserResponseDto> {
    return await this.userRepository.get(userId);
  }

  public async getByMail(userMail: string): Promise<User> {
    return await this.userRepository.getByMail(userMail);
  }

  public async update(
    userId: string,
    updateUserDto: UpdateUserRequestDto,
    adminMail: string
  ): Promise<UserResponseDto> {
    const adminUser: User = await this.userRepository.getByMail(adminMail);
    if (adminUser.role !== "ADMIN") {
      throw new Error(`This user is not an ADMIN`);
    }

    const existingUser = await this.userRepository.get(userId);
    if (!existingUser) {
      throw new Error(`User not found`);
    }

    return await this.userRepository.update(userId, updateUserDto);
  }

  public async delete(userId: string, adminMail: string): Promise<void> {
    const adminUser: User = await this.userRepository.getByMail(adminMail);
    if (adminUser.role !== "ADMIN") {
      throw new Error(`This user is not an ADMIN`);
    }

    const existingUser = await this.userRepository.get(userId);
    if (!existingUser) {
      throw new Error(`User not found`);
    }

    await this.userRepository.delete(userId);
  }
}
