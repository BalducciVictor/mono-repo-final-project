import { Injectable } from "@nestjs/common";
import { CreateChapterRequestDto } from "../../../application/dto/Chapter/Request/create-chapter-request.dto";
import { UpdateChapterRequestDto } from "../../../application/dto/Chapter/Request/update-chapter-request.dto";
import { ChapterResponseDto } from "../../../application/dto/Chapter/Response/chapter-response.dto";
import { IChapterService } from "../../../domain/interfaces/services/IChapterService";

@Injectable()
export class ChapterUseCase {
  constructor(private chapterService: IChapterService) {}

  async getChapter(chapter: string): Promise<ChapterResponseDto> {
    return await this.chapterService.get(chapter);
  }

  async getAllChapters(): Promise<Array<ChapterResponseDto>> {
    return await this.chapterService.getAll();
  }

  async createChapter(
    chapter: CreateChapterRequestDto
  ): Promise<ChapterResponseDto> {
    return await this.chapterService.create(chapter);
  }

  async deleteChapter(chapter: string): Promise<void> {
    return await this.chapterService.delete(chapter);
  }

  async updateChapter(
    chapterId: string,
    chapter: UpdateChapterRequestDto
  ): Promise<ChapterResponseDto> {
    return await this.chapterService.update(chapterId, chapter);
  }

  async markAsViewed(
    chapterId: string,
    userId: string
  ): Promise<ChapterResponseDto> {
    return await this.chapterService.markAsViewed(chapterId, userId);
  }
}
