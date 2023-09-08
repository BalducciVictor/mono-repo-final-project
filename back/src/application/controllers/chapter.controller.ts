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
  UseGuards,
} from "@nestjs/common";
import { CreateChapterRequestDto } from "../dto/Chapter/create-chapter-request.dto";
import { UpdateChapterRequestDto } from "../dto/Chapter/update-chapter-request.dto";
import { Chapter } from "src/domain/entities/chapter";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { ChapterUseCase } from "../useCases/chapter/chapter.use-case";
import { JwtAuthGuard } from "src/infrastructure/config/modules/auth/guards/jwt-auth.gard";
import { Roles } from "../decorator/user/roles.decorator";

@ApiBearerAuth()
@ApiTags("chapter")
@Controller("chapter")
export default class ChapterController {
  constructor(private readonly chapterUseCase: ChapterUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(["ADMIN"])
  @ApiOperation({
    summary: "Create Chapter",
  })
  @ApiResponse({ status: 201, description: "Chapter created.", type: Chapter })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async create(
    @Body() createChapterDto: CreateChapterRequestDto
  ): Promise<Chapter> {
    try {
      return await this.chapterUseCase.createChapter(createChapterDto);
    } catch (error) {
      console.log(error);
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
  @UseGuards(JwtAuthGuard)
  @Roles(["ADMIN"])
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
  @UseGuards(JwtAuthGuard)
  @Roles(["ADMIN"])
  @ApiOperation({
    summary: "Update Chapter",
  })
  @ApiResponse({ status: 200, description: "Chapter Updated.", type: Chapter })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiParam({ name: "chapterId", description: "Chapter ID" })
  async update(
    @Param("chapterId") chapterId: string,
    @Body() updateChapterDto: UpdateChapterRequestDto,
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
