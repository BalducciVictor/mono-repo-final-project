import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/application/dto/User/create-user.dto";
import { User } from "../entities/user";
import { IUserService } from "../interfaces/services/IUserService";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { UpdateUserDto } from "src/application/dto/User/update-user.dto";
import { UserRepository } from "src/infrastructure/repository/user.repository";

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async create(
    createUserDto: CreateUserDto,
    adminMail: string
  ): Promise<User> {
    const adminUser: User = await this.userRepository.getByMail(adminMail);
    if (adminUser.role !== "ADMIN") throw new Error(`This user is not ADMIN`);
    if (this.userRepository.getByMail(createUserDto.email))
      throw new Error(`This user already exist`);
    return await this.userRepository.create(createUserDto);
  }

  public async get(userId: string): Promise<User> {
    return await this.userRepository.get(userId);
  }

  public async getByMail(userMail: string): Promise<User> {
    return await this.userRepository.getByMail(userMail);
  }

  public async update(
    userId: string,
    updateUserDto: UpdateUserDto,
    adminMail: string
  ): Promise<User> {
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
