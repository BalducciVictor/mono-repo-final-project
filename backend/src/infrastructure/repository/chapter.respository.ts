import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { IChapterRepository } from "../../domain/interfaces/repository/IChapterRepository";
import {
  Chapter,
  ChapterDocument,
} from "../../domain/entities/chapter/chapter";
import { UpdateChapterRequestDto } from "../../application/dto/Chapter/Request/update-chapter-request.dto";
import { CreateChapterRequestDto } from "../../application/dto/Chapter/Request/create-chapter-request.dto";
import { Injectable } from "@nestjs/common";
import {
  Questionnaire,
  QuestionnaireDocument,
} from "../../domain/entities/questionnaire/questionnaire";
import { CreateQuestionnaireRequestDto } from "../../application/dto/Questionnaire/Request/create-questionnaire-request.dto";

@Injectable()
export class ChapterRepository implements IChapterRepository {
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<ChapterDocument>,
    @InjectModel(Questionnaire.name)
    private questionnaireModel: Model<QuestionnaireDocument>
  ) {}

  async get(id: string): Promise<ChapterDocument | null> {
    return await this.chapterModel.findById(id).exec();
  }

  async getAll(): Promise<Array<ChapterDocument> | null> {
    return await this.chapterModel.find().exec();
  }

  async getAllByCompanyId(
    companyId: string
  ): Promise<Array<ChapterDocument> | null> {
    return await this.chapterModel.find({ companyId: companyId }).exec();
  }

  async create(chapter: CreateChapterRequestDto): Promise<ChapterDocument> {
    const newChapter = new this.chapterModel(chapter);
    return await newChapter.save();
  }

  async delete(id: string): Promise<void> {
    await this.chapterModel.findByIdAndDelete(id).exec();
  }

  async update(
    id: string,
    updateChapterDto: UpdateChapterRequestDto
  ): Promise<ChapterDocument | null> {
    const updatedChapter = await this.chapterModel
      .findByIdAndUpdate(id, updateChapterDto, { new: true })
      .exec();

    return updatedChapter ? updatedChapter.toObject() : null;
  }

  async addQuestionnaire(
    chapter: ChapterDocument,
    createQuestionnaireDto: CreateQuestionnaireRequestDto
  ): Promise<QuestionnaireDocument | null> {
    const newQuestionnaire = new this.questionnaireModel(
      createQuestionnaireDto
    );
    chapter.questionnaire.push(newQuestionnaire);
    await chapter.save();

    return newQuestionnaire;
  }
}
