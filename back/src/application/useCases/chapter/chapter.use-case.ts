import { Injectable } from "@nestjs/common";
import { CreateChapterDto } from "src/application/dto/Chapter/create-chapter.dto";
import { UpdateChapterDto } from "src/application/dto/Chapter/update-chapter.dto";
import { Chapter } from "src/domain/entities/chapter";
import { IChapterService } from "src/domain/interfaces/services/IChapterService";

@Injectable()
export class ChapterUseCase {
  constructor(private chapterService: IChapterService) {}

  async getChapter(chapter: string): Promise<Chapter> {
    return await this.chapterService.get(chapter);
  }

  async createChapter(
    chapter: CreateChapterDto,
    adminMail: string
  ): Promise<Chapter> {
    return await this.chapterService.create(chapter, adminMail);
  }

  async deleteChapter(chapter: string, adminMail: string): Promise<void> {
    return await this.chapterService.delete(chapter, adminMail);
  }

  async updateChapter(
    chapterId: string,
    chapter: UpdateChapterDto,
    adminMail: string
  ): Promise<Chapter> {
    return await this.chapterService.update(chapterId, chapter, adminMail);
  }
}
