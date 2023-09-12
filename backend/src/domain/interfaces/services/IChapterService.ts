import { CreateChapterRequestDto } from "src/application/dto/Chapter/Request/create-chapter-request.dto";
import { UpdateChapterRequestDto } from "src/application/dto/Chapter/Request/update-chapter-request.dto";
import { ChapterResponseDto } from "src/application/dto/Chapter/Response/chapter-response.dto";

export abstract class IChapterService {
  get: (chapterId: string) => Promise<ChapterResponseDto>;
  create: (
    createChapterDto: CreateChapterRequestDto
  ) => Promise<ChapterResponseDto>;
  update: (
    chapterId: string,
    updateChapterDto: UpdateChapterRequestDto
  ) => Promise<ChapterResponseDto>;
  delete: (chapterId: string) => Promise<void>;
}
