import { Injectable } from "@nestjs/common";
import { User } from "../entities/user";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IChapterRepository } from "../interfaces/repository/IChapterRepository";
import { IChapterService } from "../interfaces/services/IChapterService";
import { CreateChapterRequestDto } from "src/application/dto/Chapter/Request/create-chapter-request.dto";
import { Chapter } from "../entities/chapter";
import { UpdateChapterRequestDto } from "src/application/dto/Chapter/Request/update-chapter-request.dto";
import { ChapterResponseDto } from "src/application/dto/Chapter/Response/chapter-response.dto";

@Injectable()
export class ChapterService implements IChapterService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly chapterRepository: IChapterRepository
  ) {}

  public async create(
    createChapterDto: CreateChapterRequestDto
  ): Promise<ChapterResponseDto> {
    return await this.chapterRepository.create(createChapterDto);
  }

  public async get(chapterId: string): Promise<ChapterResponseDto> {
    const existingChapter: Chapter = await this.chapterRepository.get(
      chapterId
    );
    if (!existingChapter) throw new Error(`User not found`);

    return await this.chapterRepository.get(chapterId);
  }

  public async update(
    chapterId: string,
    updateChapterDto: UpdateChapterRequestDto,
    adminMail: string
  ): Promise<ChapterResponseDto> {
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
