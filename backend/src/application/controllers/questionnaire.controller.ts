import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Roles } from "../decorator/user/roles.decorator";
import { JwtAuthGuard } from "../../infrastructure/config/modules/auth/guards/jwt-auth.gard";
import { UserType } from "../../domain/enum/userType";
import { CreateQuestionnaireRequestDto } from "../dto/Questionnaire/Request/create-questionnaire-request.dto";
import { QuestionnaireResponseDto } from "../dto/Questionnaire/Response/questionnaire-response.dto";
import { QuestionnaireUseCase } from "../useCases/questionnaire/questionnaire.use-case";

@ApiBearerAuth()
@ApiTags("questionnaire")
@Controller("chapters/:chapterId/questionnaires")
export class QuestionnaireController {
  constructor(private readonly questionnaireUseCase: QuestionnaireUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Create questionnaire",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 201, description: "Created." })
  create(
    @Param("chapterId") chapterId: string,
    @Body() createQuestionnaireDto: CreateQuestionnaireRequestDto
  ): Promise<QuestionnaireResponseDto> {
    return this.questionnaireUseCase.create(chapterId, createQuestionnaireDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.USER, UserType.ADMIN, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Get all questionnaire",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 200, description: "OK." })
  findAll(
    @Param("chapterId") chapterId: string
  ): Promise<Array<QuestionnaireResponseDto>> {
    return this.questionnaireUseCase.findAll(chapterId);
  }

  @Get(":questionnaireId")
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.USER, UserType.ADMIN, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Get one questionnaire",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 200, description: "OK." })
  findOne(
    @Param("chapterId") chapterId: string,
    @Param("questionnaireId") questionnaireId: string
  ) {
    return this.questionnaireUseCase.findOne(chapterId, questionnaireId);
  }

  @Put(":questionnaireId")
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Updated questionnaire",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 200, description: "OK." })
  update(
    @Param("chapterId") chapterId: string,
    @Param("questionnaireId") questionnaireId: string,
    @Body() updateQuestionnaireDto: CreateQuestionnaireRequestDto
  ) {
    return this.questionnaireUseCase.update(
      chapterId,
      questionnaireId,
      updateQuestionnaireDto
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Deleted questionnaire",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 204, description: "No Content." })
  @Delete(":questionnaireId")
  remove(
    @Param("questionnaireId") questionnaireId: string,
    @Param("chapterId") chapterId: string
  ) {
    return this.questionnaireUseCase.remove(chapterId, questionnaireId);
  }
}
