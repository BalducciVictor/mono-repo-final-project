import { Injectable } from "@nestjs/common";
import { UpdateChapterDto } from "src/application/dto/Chapter/update-chapter.dto";
import { Chapter } from "src/domain/entities/chapter";
@Injectable()
export class UpdateChapterUseCase {
  constructor(private chapterService: IChapterService) {}

  async execute(
    chapter: UpdateChapterDto,
    adminMail: string
  ): Promise<Chapter> {
    return await this.chapterService.update(chapter, adminMail);
  }
}
