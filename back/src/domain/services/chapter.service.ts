import { Injectable } from "@nestjs/common";
import { User } from "../entities/user";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IChapterRepository } from "../interfaces/repository/IChapterRepository";
import { IChapterService } from "../interfaces/services/IChapterService";
import { CreateChapterDto } from "src/application/dto/Chapter/create-chapter.dto";
import { Chapter } from "../entities/chapter";
import { UpdateChapterDto } from "src/application/dto/Chapter/update-chapter.dto";

@Injectable()
export class ChapterService implements IChapterService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly chapterRepository: IChapterRepository
  ) {}

  public async create(
    createChapterDto: CreateChapterDto,
    adminMail: string
  ): Promise<Chapter> {
    const adminUser: User = await this.userRepository.getByMail(adminMail);
    if (adminUser.role !== "ADMIN") throw new Error(`This user is not ADMIN`);

    return await this.chapterRepository.create(createChapterDto);
  }

  public async get(chapterId: string): Promise<Chapter> {
    const existingChapter: Chapter = await this.chapterRepository.get(
      chapterId
    );
    if (!existingChapter) throw new Error(`User not found`);

    return await this.chapterRepository.get(chapterId);
  }

  public async update(
    chapterId: string,
    updateChapterDto: UpdateChapterDto,
    adminMail: string
  ): Promise<Chapter> {
    const adminUser: User = await this.userRepository.getByMail(adminMail);
    if (adminUser.role !== "ADMIN") throw new Error(`This user is not ADMIN`);

    const existingChapter: Chapter = await this.chapterRepository.get(
      chapterId
    );
    if (!existingChapter) throw new Error(`User not found`);

    return await this.chapterRepository.update(chapterId, updateChapterDto);
  }

  public async delete(chapterId: string, adminMail: string): Promise<void> {
    const adminUser: User = await this.userRepository.getByMail(adminMail);
    if (adminUser.role !== "ADMIN")
      throw new Error(`This user is not an ADMIN`);

    const existingChapter: Chapter = await this.chapterRepository.get(
      chapterId
    );
    if (!existingChapter) throw new Error(`User not found`);

    await this.chapterRepository.delete(chapterId);
  }
}
