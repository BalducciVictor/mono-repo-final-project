import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { User } from "src/domain/entities/user";
import { CreateUserDto } from "../dto/User/create-user.dto";
import { CreateUserUseCase } from "../useCases/user/createUser.use-case";
import { GetUserUseCase } from "../useCases/user/getUser.use-case";
import { UpdateUserDto } from "../dto/User/update-user.dto";
import { UpdateUserUseCase } from "../useCases/user/updateUser.user-case";
import { DeleteUserUseCase } from "../useCases/user/deleteUser.use-case";
import { CreateChapterDto } from "../dto/Chapter/create-chapter.dto";
import { UpdateChapterDto } from "../dto/Chapter/update-chapter.dto";

@Controller("chapter")
export default class ChapterController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  @Post()
  async create(
    @Body() chapter: CreateChapterDto,
    adminMail: string
  ): Promise<User> {
    try {
      return await this.createChapterUseCase.execute(chapter, adminMail);
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async get(@Param() chapterId: string): Promise<User> {
    try {
      return await this.getChapterUseCase.execute(chapterId);
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete()
  async delete(@Param() chapterId: string, adminMail: string): Promise<void> {
    try {
      await this.deleteChapterUseCase.execute(chapterId, adminMail);
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put()
  async update(
    @Body() chapter: UpdateChapterDto,
    adminMail: string
  ): Promise<User> {
    try {
      return await this.updateChapterUseCase.execute(chapter, adminMail);
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
