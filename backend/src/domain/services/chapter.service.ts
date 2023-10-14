import { Injectable, NotFoundException } from "@nestjs/common";
import { IChapterRepository } from "../interfaces/repository/IChapterRepository";
import { IChapterService } from "../interfaces/services/IChapterService";
import { CreateChapterRequestDto } from "../../application/dto/Chapter/Request/create-chapter-request.dto";
import { UpdateChapterRequestDto } from "../../application/dto/Chapter/Request/update-chapter-request.dto";
import { ChapterResponseDto } from "../../application/dto/Chapter/Response/chapter-response.dto";
import { IBlobContentService } from "../interfaces/services/IBlobContentService";

@Injectable()
export class ChapterService implements IChapterService {
  constructor(
    private readonly chapterRepository: IChapterRepository,
    private readonly blobContentRepository: IBlobContentService
  ) {}

  public async create(
    createChapterDto: CreateChapterRequestDto
  ): Promise<ChapterResponseDto> {
    createChapterDto.createdAt = new Date();
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
    existingChapter.documentation.forEach(async (doc) => {
      doc.documentationContent.forEach(async (content) => {
        if (content.contentType === "image")
          await this.blobContentRepository.deleteFile(content.content);
      });
    });
    await this.chapterRepository.delete(chapterId);
  }

  public async markAsViewed(
    chapterId: string,
    userId: string
  ): Promise<ChapterResponseDto> {
    const existingChapter: ChapterResponseDto =
      await this.chapterRepository.get(chapterId);
    if (!existingChapter) throw new NotFoundException(`Chapter not found`);

    return await this.chapterRepository.markAsViewed(chapterId, userId);
  }
}
