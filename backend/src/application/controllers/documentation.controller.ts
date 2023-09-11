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
import { Chapter } from "src/domain/entities/chapter";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/infrastructure/config/modules/auth/guards/jwt-auth.gard";
import { Roles } from "../decorator/user/roles.decorator";
import { Documentation } from "src/domain/entities/documentation";
import { CreateDocumentationRequestDto } from "../dto/Documentation/Request/create-documentation-request.dto";
import { DocumentationUseCase } from "../useCases/documentation/documentation.use-case";
import { GetDocumentationResponseDto } from "../dto/Documentation/Response/get-documentation-response.dto";

@ApiBearerAuth()
@ApiTags("documentation")
@Controller("documentation")
export default class DocumentationController {
  constructor(private readonly documentationUseCase: DocumentationUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(["ADMIN"])
  @ApiOperation({
    summary: "Create documentation",
  })
  @ApiResponse({
    status: 201,
    description: "Documentation created.",
    type: Chapter,
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async create(
    @Body() createDocumentationDto: CreateDocumentationRequestDto
  ): Promise<Documentation> {
    try {
      return await this.documentationUseCase.createDocumentationAndContent(
        createDocumentationDto
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":documentationId")
  @ApiOperation({
    summary: "Get Chapter",
  })
  @ApiResponse({
    status: 200,
    description: "The found documentation.",
    type: Documentation,
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiParam({ name: "documentationId", description: "Documentation ID" })
  async get(
    @Param("documentationId") documentationId: string
  ): Promise<GetDocumentationResponseDto> {
    try {
      return await this.documentationUseCase.getDocumentationById(
        documentationId
      );
    } catch (error) {
      throw new HttpException(
        "Une erreur est survenue",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // @Delete(":documentationId/:adminMail")
  // @UseGuards(JwtAuthGuard)
  // @Roles(["ADMIN"])
  // @ApiOperation({
  //   summary: "Delete documentation",
  // })
  // @ApiResponse({ status: 204, description: "Chapter deleted." })
  // @ApiResponse({ status: 403, description: "Forbidden." })
  // @ApiParam({ name: "documentationId", description: "Chapter ID" })
  // @ApiParam({ name: "adminMail", description: "Admin Mail" })
  // async delete(
  //   @Param("documentationId") documentationId: string,
  //   @Param("adminMail") adminMail: string
  // ): Promise<void> {
  //   try {
  //     await this.chapterUseCase.deleteChapter(documentationId, adminMail);
  //   } catch (error) {
  //     throw new HttpException(
  //       "Une erreur est survenue",
  //       HttpStatus.INTERNAL_SERVER_ERROR
  //     );
  //   }
  // }

  // @Put(":documentationId")
  // @UseGuards(JwtAuthGuard)
  // @Roles(["ADMIN"])
  // @ApiOperation({
  //   summary: "Update documentation",
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: "Documentation Updated.",
  //   type: Documentation,
  // })
  // @ApiResponse({ status: 403, description: "Forbidden." })
  // @ApiParam({ name: "documentationId", description: "Documentation ID" })
  // async update(
  //   @Param("documentationId") documentationId: string,
  //   @Body() updateDocumentationDto: UpdateDocumentationRequestDto,
  //   @Body("adminMail") adminMail: string
  // ): Promise<Documentation> {
  //   try {
  //     return await this.chapterUseCase.updateChapter(
  //       documentationId,
  //       updateDocumentationDto,
  //       adminMail
  //     );
  //   } catch (error) {
  //     throw new HttpException(
  //       "Une erreur est survenue",
  //       HttpStatus.INTERNAL_SERVER_ERROR
  //     );
  //   }
  // }
}
