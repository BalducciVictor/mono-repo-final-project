import { Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IChapterRepository } from "../interfaces/repository/IChapterRepository";
import { IChapterService } from "../interfaces/services/IChapterService";
import { CreateChapterRequestDto } from "src/application/dto/Chapter/Request/create-chapter-request.dto";
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
    const existingChapter: ChapterResponseDto =
      await this.chapterRepository.get(chapterId);
    if (!existingChapter) throw new NotFoundException(`Chapter not found`);

    return existingChapter;
  }

  public async getAll(): Promise<Array<ChapterResponseDto>> {
    const existingChapter: Array<ChapterResponseDto> =
      await this.chapterRepository.getAll();
    if (!existingChapter) throw new NotFoundException(`Chapters not found`);

    return existingChapter;
  }

  public async update(
    chapterId: string,
    updateChapterDto: UpdateChapterRequestDto
  ): Promise<ChapterResponseDto> {
    const existingChapter: ChapterResponseDto =
      await this.chapterRepository.get(chapterId);
    if (!existingChapter) throw new NotFoundException(`Chapter not found`);

    return await this.chapterRepository.update(chapterId, updateChapterDto);
  }

  public async delete(chapterId: string): Promise<void> {
    const existingChapter: ChapterResponseDto =
      await this.chapterRepository.get(chapterId);
    if (!existingChapter) throw new NotFoundException(`Chapter not found`);

    await this.chapterRepository.delete(chapterId);
  }
}
