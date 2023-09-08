import { Injectable } from "@nestjs/common";
import { CreateChapterRequestDto } from "src/application/dto/Chapter/create-chapter-request.dto";
import { UpdateChapterRequestDto } from "src/application/dto/Chapter/update-chapter-request.dto";
import { Chapter } from "src/domain/entities/chapter";
import { IChapterService } from "src/domain/interfaces/services/IChapterService";

@Injectable()
export class ChapterUseCase {
  constructor(private chapterService: IChapterService) {}

  async getChapter(chapter: string): Promise<Chapter> {
    return await this.chapterService.get(chapter);
  }

  async createChapter(
    chapter: CreateChapterRequestDto,
    adminMail: string
  ): Promise<Chapter> {
    return await this.chapterService.create(chapter, adminMail);
  }

  async deleteChapter(chapter: string, adminMail: string): Promise<void> {
    return await this.chapterService.delete(chapter, adminMail);
  }

  async updateChapter(
    chapterId: string,
    chapter: UpdateChapterRequestDto,
    adminMail: string
  ): Promise<Chapter> {
    return await this.chapterService.update(chapterId, chapter, adminMail);
  }
}
