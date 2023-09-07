import { CreateChapterDto } from "src/application/dto/Chapter/create-chapter.dto";
import { Chapter } from "src/domain/entities/chapter";
import { UpdateChapterDto } from "src/application/dto/Chapter/update-chapter.dto";

export abstract class IChapterService {
  get: (chapterId: string) => Promise<Chapter>;
  create: (
    createChapterDto: CreateChapterDto,
    chapterCreatingMail: string
  ) => Promise<Chapter>;
  update: (
    chapterId: string,
    updateChapterDto: UpdateChapterDto,
    adminMail: string
  ) => Promise<Chapter>;
  delete: (chapterId: string, adminMail: string) => Promise<void>;
}
