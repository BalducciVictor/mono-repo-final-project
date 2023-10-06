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
import { IQuestionnaireService } from "src/domain/interfaces/services/IQuestionnaireService";
import { Roles } from "../decorator/user/roles.decorator";
import { JwtAuthGuard } from "src/infrastructure/config/modules/auth/guards/jwt-auth.gard";
import { UserType } from "src/domain/enum/userType";
import { CreateQuestionnaireRequestDto } from "../dto/Questionnaire/Request/create-questionnaire-request.dto";

@ApiBearerAuth()
@ApiTags("questionnaire")
@Controller("chapters/:chapterId/questionnaires")
export class QuestionnaireController {
  constructor(private readonly questionnaireService: IQuestionnaireService) {}

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
  ) {
    return this.questionnaireService.create(chapterId, createQuestionnaireDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.USER, UserType.ADMIN, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Get all questionnaire",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 200, description: "OK." })
  findAll(@Param("chapterId") chapterId: string) {
    return this.questionnaireService.findAll(chapterId);
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
    return this.questionnaireService.findOne(chapterId, questionnaireId);
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
    @Body() updateQuestionnaireDto: any
  ) {
    return this.questionnaireService.update(
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
    return this.questionnaireService.remove(chapterId, questionnaireId);
  }
}
