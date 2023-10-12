import { CreateChapterRequestDto } from "src/application/dto/Chapter/Request/create-chapter-request.dto";
import { UpdateChapterRequestDto } from "src/application/dto/Chapter/Request/update-chapter-request.dto";
import { ChapterResponseDto } from "src/application/dto/Chapter/Response/chapter-response.dto";
import { CreateQuestionnaireRequestDto } from "src/application/dto/Questionnaire/Request/create-questionnaire-request.dto";
import { ChapterDocument } from "src/domain/entities/chapter/chapter";
import { QuestionnaireDocument } from "src/domain/entities/questionnaire/questionnaire";

export abstract class IChapterRepository {
  get: (chapterId: string) => Promise<ChapterDocument>;
  create: (
    createChapterDto: CreateChapterRequestDto
  ) => Promise<ChapterResponseDto>;
  delete: (id: string) => Promise<void>;
  update: (
    id: string,
    updateChapterDto: UpdateChapterRequestDto
  ) => Promise<ChapterResponseDto | null>;
  getAll: () => Promise<Array<ChapterResponseDto> | null>;
  addQuestionnaire: (
    chapter: ChapterDocument,
    createQuestionnaireDto: CreateQuestionnaireRequestDto
  ) => Promise<QuestionnaireDocument | null>;
  getAllByCompanyId: (
    companyId: string
  ) => Promise<Array<ChapterDocument> | null>;
}
