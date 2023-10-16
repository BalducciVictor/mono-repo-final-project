import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CreateChapterRequestDto } from "../dto/Chapter/Request/create-chapter-request.dto";
import { UpdateChapterRequestDto } from "../dto/Chapter/Request/update-chapter-request.dto";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { ChapterUseCase } from "../useCases/chapter/chapter.use-case";
import { JwtAuthGuard } from "../../infrastructure/config/modules/auth/guards/jwt-auth.gard";
import { Roles } from "../decorator/user/roles.decorator";
import { ChapterResponseDto } from "../dto/Chapter/Response/chapter-response.dto";
import { UserType } from "../../domain/enum/userType";

@ApiBearerAuth()
@ApiTags("chapter")
@Controller("chapter")
export default class ChapterController {
  constructor(private readonly chapterUseCase: ChapterUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Create Chapter",
  })
  @ApiResponse({
    status: 201,
    description: "Chapter created.",
    type: ChapterResponseDto,
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async create(
    @Body() createChapterDto: CreateChapterRequestDto
  ): Promise<ChapterResponseDto> {
    return await this.chapterUseCase.createChapter(createChapterDto);
  }

  @Get(":chapterId")
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.USER, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Get Chapter",
  })
  @ApiResponse({
    status: 200,
    description: "The found chapter.",
    type: ChapterResponseDto,
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiParam({ name: "chapterId", description: "Chapter ID" })
  async get(
    @Param("chapterId") chapterId: string
  ): Promise<ChapterResponseDto> {
    return await this.chapterUseCase.getChapter(chapterId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.USER, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Get all Chapters",
  })
  @ApiResponse({
    status: 200,
    description: "The found chapters.",
    type: Array<ChapterResponseDto>,
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async getAll(): Promise<Array<ChapterResponseDto>> {
    return await this.chapterUseCase.getAllChapters();
  }

  @Delete(":chapterId")
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Delete Chapter",
  })
  @ApiResponse({ status: 204, description: "Chapter deleted." })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiParam({ name: "chapterId", description: "Chapter ID" })
  async delete(@Param("chapterId") chapterId: string): Promise<void> {
    await this.chapterUseCase.deleteChapter(chapterId);
  }

  @Put(":chapterId")
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Update Chapter",
  })
  @ApiResponse({
    status: 200,
    description: "Chapter Updated.",
    type: ChapterResponseDto,
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiParam({ name: "chapterId", description: "Chapter ID" })
  async update(
    @Param("chapterId") chapterId: string,
    @Body() updateChapterDto: UpdateChapterRequestDto
  ): Promise<ChapterResponseDto> {
    return await this.chapterUseCase.updateChapter(chapterId, updateChapterDto);
  }

  @Put(":chapterId/markAsViewed/:userId")
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN, UserType.ADMIN])
  @ApiOperation({
    summary: "mark this chapter view by this user",
  })
  @ApiResponse({
    status: 200,
    description: "Chapter Updated with view",
    type: ChapterResponseDto,
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiParam({ name: "chapterId", description: "Chapter ID" })
  @ApiParam({ name: "userId", description: "User ID" })
  async markAsViewed(
    @Param("chapterId") chapterId: string,
    @Param("userId") userId: string
  ): Promise<ChapterResponseDto> {
    return await this.chapterUseCase.markAsViewed(chapterId, userId);
  }
}
