import { CreateChapterRequestDto } from "src/application/dto/Chapter/Request/create-chapter-request.dto";
import { Chapter } from "src/domain/entities/chapter";
import { UpdateChapterRequestDto } from "src/application/dto/Chapter/Request/update-chapter-request.dto";
import { ChapterResponseDto } from "src/application/dto/Chapter/Response/chapter-response.dto";

export abstract class IChapterService {
  get: (chapterId: string) => Promise<ChapterResponseDto>;
  create: (
    createChapterDto: CreateChapterRequestDto
  ) => Promise<ChapterResponseDto>;
  update: (
    chapterId: string,
    updateChapterDto: UpdateChapterRequestDto,
    adminMail: string
  ) => Promise<ChapterResponseDto>;
  delete: (chapterId: string, adminMail: string) => Promise<void>;
}