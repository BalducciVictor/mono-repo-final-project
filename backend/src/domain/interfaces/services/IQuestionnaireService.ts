import { CreateQuestionnaireRequestDto } from "src/application/dto/Questionnaire/Request/create-questionnaire-request.dto";
import { QuestionnaireResponseDto } from "src/application/dto/Questionnaire/Response/questionnaire-response.dto";

export abstract class IQuestionnaireService {
  create: (
    chapterId: string,
    createQuestionnaireDto: CreateQuestionnaireRequestDto
  ) => Promise<QuestionnaireResponseDto>;
  findAll: (chapterId: string) => Promise<Array<QuestionnaireResponseDto>>;
  findOne: (
    chapterId: string,
    questionnaireId: string
  ) => Promise<QuestionnaireResponseDto | null>;
  update: (
    chapterId: string,
    questionnaireId: string,
    updateQuestionnaireDto: any
  ) => Promise<QuestionnaireResponseDto>;
  remove: (chapterId: string, questionnaireId: string) => Promise<void>;
}
