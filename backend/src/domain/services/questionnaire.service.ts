import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chapter, ChapterDocument } from "../entities/chapter/chapter";
import {
  Questionnaire,
  QuestionnaireDocument,
} from "../entities/quiz/questionnaire";
import { IQuestionnaireService } from "../interfaces/services/IQuestionnaireService";
import { CreateQuestionnaireRequestDto } from "src/application/dto/Questionnaire/Request/create-questionnaire-request.dto";
import { IChapterRepository } from "../interfaces/repository/IChapterRepository";
import { QuestionnaireResponseDto } from "src/application/dto/Questionnaire/Response/questionnaire-response.dto";

@Injectable()
export class QuestionnaireService implements IQuestionnaireService {
  constructor(private readonly chapterRepository: IChapterRepository) {}

  async create(
    chapterId: string,
    createQuestionnaireDto: CreateQuestionnaireRequestDto
  ): Promise<QuestionnaireResponseDto> {
    const chapter = await this.chapterRepository.get(chapterId);
    if (!chapter)
      throw new NotFoundException(`Chapter with ID ${chapterId} not found.`);

    return await this.chapterRepository.addQuestionnaire(
      chapter,
      createQuestionnaireDto
    );
  }

  async findAll(chapterId: string): Promise<Array<QuestionnaireResponseDto>> {
    const chapter = await this.chapterRepository.get(chapterId);
    if (!chapter)
      throw new NotFoundException(`Chapter with ID ${chapterId} not found.`);
    if (!chapter?.questionnaire || chapter?.questionnaire.length === 0)
      throw new NotFoundException(
        `No Questionnaire found associated with chapter ID ${chapterId}`
      );
    return chapter?.questionnaire || [];
  }

  async findOne(
    chapterId: string,
    questionnaireId: string
  ): Promise<QuestionnaireResponseDto | null> {
    const chapter = await this.chapterRepository.get(chapterId);
    if (!chapter?.questionnaire.id(questionnaireId))
      throw new NotFoundException(
        `Questinnaire with ID ${questionnaireId} not found.`
      );
    return chapter?.questionnaire.id(questionnaireId);
  }

  async update(
    chapterId: string,
    questionnaireId: string,
    updateQuestionnaireDto: any
  ): Promise<QuestionnaireResponseDto> {
    const chapter = await this.chapterRepository.get(chapterId);
    const questionnaire = chapter?.questionnaire.id(questionnaireId);
    if (!questionnaire)
      throw new NotFoundException(
        `Questionnaire with ID ${questionnaireId} not found.`
      );

    Object.assign(questionnaire, updateQuestionnaireDto);
    await chapter.save();

    return questionnaire;
  }

  async remove(chapterId: string, questionnaireId: string): Promise<void> {
    const chapter = await this.chapterRepository.get(chapterId);

    if (!chapter)
      throw new NotFoundException(`Chapter with ID ${chapterId} not found.`);

    const questionnaireIndex = chapter.questionnaire.findIndex(
      (q) => q._id.toString() === questionnaireId
    );

    if (questionnaireIndex === -1)
      throw new NotFoundException(
        `Questionnaire with ID ${questionnaireId} not found.`
      );

    chapter.questionnaire.splice(questionnaireIndex, 1);
    await chapter.save();
  }
}
