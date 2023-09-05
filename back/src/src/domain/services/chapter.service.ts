import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/application/dto/User/create-user.dto";
import { User } from "../entities/user";
import { IUserService } from "../interfaces/services/IUserService";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IChapterRepository } from "../interfaces/repository/IChapterRepository";
import { UpdateUserDto } from "src/application/dto/User/update-user.dto";
import { IChapterService } from "../interfaces/services/IChapterService";
import { CreateChapterDto } from "src/application/dto/Chapter/create-chapter.dto";
import { Chapter } from "../entities/chapter";

@Injectable()
export class ChapterService implements IChapterService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly chapterRepository: IChapterRepository
  ) {}

  async create(
    createChapterDto: CreateChapterDto,
    adminMail: string
  ): Promise<Chapter> {
    const adminUser: User = await this.userRepository.getByMail(adminMail);
    if (adminUser.role !== "ADMIN") throw new Error(`This user is not ADMIN`);

    return await this.chapterRepository.create(createChapterDto);
  }

  async get(userId: string): Promise<User> {
    return await this.repository.get(userId);
  }

  async getByMail(userMail: string): Promise<User> {
    return await this.repository.getByMail(userMail);
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
    adminMail: string
  ): Promise<User> {
    const adminUser: User = await this.repository.getByMail(adminMail);
    if (adminUser.role !== "ADMIN") throw new Error(`This user is not ADMIN`);

    const existingUser = await this.repository.get(userId);
    if (!existingUser) {
      throw new Error(`User not found`);
    }

    return await this.repository.update(userId, updateUserDto);
  }

  async delete(userId: string, adminMail: string): Promise<void> {
    const adminUser: User = await this.repository.getByMail(adminMail);
    if (adminUser.role !== "ADMIN") {
      throw new Error(`This user is not an ADMIN`);
    }

    const existingUser = await this.repository.get(userId);
    if (!existingUser) {
      throw new Error(`User not found`);
    }

    await this.repository.delete(userId);
  }
}
