import {
  Controller,
  Delete,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { UserType } from "../../domain/enum/userType";
import { JwtAuthGuard } from "../../infrastructure/config/modules/auth/guards/jwt-auth.gard";
import { Roles } from "../decorator/user/roles.decorator";
import { CreateContentResponseDto } from "../dto/Content/Response/create-content-reponse.dto";
import { ContentUseCase } from "../useCases/content/content.use-case";

@ApiBearerAuth()
@ApiTags("upload")
@Controller("upload")
export class ContentController {
  constructor(private readonly contentUseCase: ContentUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Create Blob",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 201, description: "Created." })
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query("contentType") contentType: string
  ): Promise<CreateContentResponseDto> {
    return await this.contentUseCase.uploadFile(file, contentType);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @Roles([UserType.ADMIN, UserType.SUPERADMIN])
  @ApiOperation({
    summary: "Delete Blob",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 201, description: "Created." })
  async deleteFile(@Query("fileName") fileName: string): Promise<void> {
    await this.contentUseCase.deleteFile(fileName);
  }
}
