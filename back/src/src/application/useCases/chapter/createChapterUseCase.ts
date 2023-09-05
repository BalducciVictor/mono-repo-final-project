import { Injectable } from "@nestjs/common";
import { CreateChapterDto } from "src/application/dto/Chapter/create-chapter.dto";
import { Chapter } from "src/domain/entities/chapter";
import { User } from "src/domain/entities/user";
import { IUserService } from "src/domain/interfaces/services/IUserService";

@Injectable()
export class CreateChapterUseCase {
  constructor(private chapterService: IChapterService) {}

  async execute(
    chapter: CreateChapterDto,
    adminMail: string
  ): Promise<Chapter> {
    return await this.chapterService.create(chapter, adminMail);
  }
}
