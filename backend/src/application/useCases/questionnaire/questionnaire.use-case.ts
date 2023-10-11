import { Injectable } from "@nestjs/common";
import { CreateQuestionnaireRequestDto } from "../../../application/dto/Questionnaire/Request/create-questionnaire-request.dto";
import { UpdateQuestionnaireRequestDto } from "../../../application/dto/Questionnaire/Request/update-questionnaire-request.dto";
import { QuestionnaireResponseDto } from "../../../application/dto/Questionnaire/Response/questionnaire-response.dto";
import { IQuestionnaireService } from "../../../domain/interfaces/services/IQuestionnaireService";

@Injectable()
export class QuestionnaireUseCase {
  constructor(private questionnaireService: IQuestionnaireService) {}

  async create(
    chapterId: string,
    createQuestionnaireDto: CreateQuestionnaireRequestDto
  ): Promise<QuestionnaireResponseDto> {
    return await this.questionnaireService.create(
      chapterId,
      createQuestionnaireDto
    );
  }

  async findAll(chapterId: string): Promise<Array<QuestionnaireResponseDto>> {
    return await this.questionnaireService.findAll(chapterId);
  }

  async findOne(
    chapterId: string,
    questionnaireId: string
  ): Promise<QuestionnaireResponseDto> {
    return await this.questionnaireService.findOne(chapterId, questionnaireId);
  }

  async update(
    chapterId: string,
    questionnaireId: string,
    updateQuestionnaireDto: UpdateQuestionnaireRequestDto
  ): Promise<QuestionnaireResponseDto> {
    return await this.questionnaireService.update(
      chapterId,
      questionnaireId,
      updateQuestionnaireDto
    );
  }

  async remove(chapterId: string, questionnaireId: string): Promise<void> {
    return await this.questionnaireService.remove(chapterId, questionnaireId);
  }
}
