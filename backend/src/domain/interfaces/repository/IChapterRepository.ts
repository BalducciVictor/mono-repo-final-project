import { CreateChapterRequestDto } from "src/application/dto/Chapter/Request/create-chapter-request.dto";
import { UpdateChapterRequestDto } from "src/application/dto/Chapter/Request/update-chapter-request.dto";
import { ChapterResponseDto } from "src/application/dto/Chapter/Response/chapter-response.dto";

export abstract class IChapterRepository {
  get: (chapterId: string) => Promise<ChapterResponseDto>;
  create: (
    createChapterDto: CreateChapterRequestDto
  ) => Promise<ChapterResponseDto>;
  delete: (id: string) => Promise<void>;
  update: (
    id: string,
    updateChapterDto: UpdateChapterRequestDto
  ) => Promise<ChapterResponseDto | null>;
  getAll: () => Promise<Array<ChapterResponseDto> | null>;
}
