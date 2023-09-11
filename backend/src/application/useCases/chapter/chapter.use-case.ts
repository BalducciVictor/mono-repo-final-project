import { Injectable } from "@nestjs/common";
import { CreateChapterRequestDto } from "src/application/dto/Chapter/Request/create-chapter-request.dto";
import { UpdateChapterRequestDto } from "src/application/dto/Chapter/Request/update-chapter-request.dto";
import { ChapterResponseDto } from "src/application/dto/Chapter/Response/chapter-response.dto";
import { Chapter } from "src/domain/entities/chapter";
import { IChapterService } from "src/domain/interfaces/services/IChapterService";

@Injectable()
export class ChapterUseCase {
  constructor(private chapterService: IChapterService) {}

  async getChapter(chapter: string): Promise<ChapterResponseDto> {
    return await this.chapterService.get(chapter);
  }

  async createChapter(
    chapter: CreateChapterRequestDto
  ): Promise<ChapterResponseDto> {
    return await this.chapterService.create(chapter);
  }

  async deleteChapter(chapter: string, adminMail: string): Promise<void> {
    return await this.chapterService.delete(chapter, adminMail);
  }

  async updateChapter(
    chapterId: string,
    chapter: UpdateChapterRequestDto,
    adminMail: string
  ): Promise<ChapterResponseDto> {
    return await this.chapterService.update(chapterId, chapter, adminMail);
  }
}
