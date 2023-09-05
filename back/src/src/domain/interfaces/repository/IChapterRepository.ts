import { Chapter } from "src/domain/entities/chapter";
import { CreateChapterDto } from "src/application/dto/Chapter/create-chapter.dto";
import { UpdateChapterDto } from "src/application/dto/Chapter/update-chapter.dto";

export interface IChapterRepository {
  get(userId: string): Promise<Chapter>;
  create(createChapterDto: CreateChapterDto): Promise<Chapter>;
  delete(id: string): Promise<void>;
  update(
    id: string,
    updateChapterDto: UpdateChapterDto
  ): Promise<Chapter | null>;
}
