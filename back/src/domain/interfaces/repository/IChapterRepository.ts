import { Chapter } from "src/domain/entities/chapter";
import { CreateChapterRequestDto } from "src/application/dto/Chapter/create-chapter-request.dto";
import { UpdateChapterRequestDto } from "src/application/dto/Chapter/update-chapter-request.dto";

export abstract class IChapterRepository {
  get: (chapterId: string) => Promise<Chapter>;
  create: (createChapterDto: CreateChapterRequestDto) => Promise<Chapter>;
  delete: (id: string) => Promise<void>;
  update: (
    id: string,
    updateChapterDto: UpdateChapterRequestDto
  ) => Promise<Chapter | null>;
}
