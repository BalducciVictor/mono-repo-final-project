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
import { CreateChapterDto } from "../dto/Chapter/create-chapter.dto";
import { UpdateChapterDto } from "../dto/Chapter/update-chapter.dto";
import { Chapter } from "src/domain/entities/chapter";
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { ChapterUseCase } from "../useCases/chapter/chapter.use-case";

@ApiTags("chapter")
@Controller("chapter")
export default class ChapterController {
  constructor(private readonly chapterUseCase: ChapterUseCase) {}

  @Post()
  @ApiOperation({
    summary: "Create Chapter",
  })
  @ApiResponse({ status: 201, description: "Chapter created.", type: Chapter })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async create(
    @Body() createChapterDto: CreateChapterDto,
    @Body("adminMail") adminMail: string
  ): Promise<Chapter> {
    try {
      return await this.chapterUseCase.createChapter(
        createChapterDto,
        adminMail
      );
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":chapterId")
  @ApiOperation({
    summary: "Get Chapter",
  })
  @ApiResponse({
    status: 200,
    description: "The found chapter.",
    type: Chapter,
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiParam({ name: "chapterId", description: "Chapter ID" })
  async get(@Param("chapterId") chapterId: string): Promise<Chapter> {
    try {
      return await this.chapterUseCase.getChapter(chapterId);
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(":chapterId/:adminMail")
  @ApiOperation({
    summary: "Delete Chapter",
  })
  @ApiResponse({ status: 204, description: "Chapter deleted." })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiParam({ name: "chapterId", description: "Chapter ID" })
  @ApiParam({ name: "adminMail", description: "Admin Mail" })
  async delete(
    @Param("chapterId") chapterId: string,
    @Param("adminMail") adminMail: string
  ): Promise<void> {
    try {
      await this.chapterUseCase.deleteChapter(chapterId, adminMail);
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(":chapterId")
  @ApiOperation({
    summary: "Update Chapter",
  })
  @ApiResponse({ status: 200, description: "Chapter Updated.", type: Chapter })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiParam({ name: "chapterId", description: "Chapter ID" })
  async update(
    @Param("chapterId") chapterId: string,
    @Body() updateChapterDto: UpdateChapterDto,
    @Body("adminMail") adminMail: string
  ): Promise<Chapter> {
    try {
      return await this.chapterUseCase.updateChapter(
        chapterId,
        updateChapterDto,
        adminMail
      );
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
