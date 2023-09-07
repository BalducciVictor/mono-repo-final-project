import { CreateChapterRequestDto } from "src/application/dto/Chapter/create-chapter-request.dto";
import { Chapter } from "src/domain/entities/chapter";
import { UpdateChapterRequestDto } from "src/application/dto/Chapter/update-chapter-request.dto";

export abstract class IChapterService {
  get: (chapterId: string) => Promise<Chapter>;
  create: (
    createChapterDto: CreateChapterRequestDto,
    chapterCreatingMail: string
  ) => Promise<Chapter>;
  update: (
    chapterId: string,
    updateChapterDto: UpdateChapterRequestDto,
    adminMail: string
  ) => Promise<Chapter>;
  delete: (chapterId: string, adminMail: string) => Promise<void>;
}
