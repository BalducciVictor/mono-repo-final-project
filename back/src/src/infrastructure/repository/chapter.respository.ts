import { User, UserDocument } from "src/domain/entities/user";
import UserModel from "../models/user.model";
import { CreateUserDto } from "src/application/dto/User/create-user.dto";
import { IUserRepository } from "src/domain/interfaces/repository/IUserRepository";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UpdateUserDto } from "src/application/dto/User/update-user.dto";
import { IChapterRepository } from "src/domain/interfaces/repository/IChapterRepository";
import { Chapter, ChapterDocument } from "src/domain/entities/chapter";
import { UpdateChapterDto } from "src/application/dto/Chapter/update-chapter.dto";
import { CreateChapterDto } from "src/application/dto/Chapter/create-chapter.dto";

export class ChapterRepository implements IChapterRepository {
  prisma: any;
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<ChapterDocument>
  ) {}

  async get(id: string): Promise<Chapter | null> {
    return this.chapterModel.findById(id).exec();
  }

  async create(chapter: CreateChapterDto): Promise<Chapter> {
    const newChapter = new this.chapterModel(chapter);
    return newChapter.save();
  }

  async delete(id: string): Promise<void> {
    await this.chapterModel.findByIdAndDelete(id).exec();
  }

  async update(
    id: string,
    updateChapterDto: UpdateChapterDto
  ): Promise<Chapter | null> {
    const updatedChapter = await this.chapterModel
      .findByIdAndUpdate(id, updateChapterDto, { new: true })
      .exec();

    return updatedChapter ? updatedChapter.toObject() : null;
  }
}
