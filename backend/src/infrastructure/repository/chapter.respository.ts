import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { IChapterRepository } from "src/domain/interfaces/repository/IChapterRepository";
import { Chapter, ChapterDocument } from "src/domain/entities/chapter";
import { UpdateChapterRequestDto } from "src/application/dto/Chapter/Request/update-chapter-request.dto";
import { CreateChapterRequestDto } from "src/application/dto/Chapter/Request/create-chapter-request.dto";
import { Injectable } from "@nestjs/common";
import { ChapterResponseDto } from "src/application/dto/Chapter/Response/chapter-response.dto";

@Injectable()
export class ChapterRepository implements IChapterRepository {
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<ChapterDocument>
  ) {}

  async get(id: string): Promise<ChapterResponseDto | null> {
    return this.chapterModel.findById(id).exec();
  }

  async create(chapter: CreateChapterRequestDto): Promise<ChapterResponseDto> {
    const newChapter = new this.chapterModel(chapter);
    return newChapter.save();
  }

  async delete(id: string): Promise<void> {
    await this.chapterModel.findByIdAndDelete(id).exec();
  }

  async update(
    id: string,
    updateChapterDto: UpdateChapterRequestDto
  ): Promise<ChapterResponseDto | null> {
    const updatedChapter = await this.chapterModel
      .findByIdAndUpdate(id, updateChapterDto, { new: true })
      .exec();

    return updatedChapter ? updatedChapter.toObject() : null;
  }
}
