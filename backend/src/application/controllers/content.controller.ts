import {
  Controller,
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
import { UserType } from "src/domain/enum/userType";
import { JwtAuthGuard } from "src/infrastructure/config/modules/auth/guards/jwt-auth.gard";
import { Roles } from "../decorator/user/roles.decorator";
import { CreateContentResponseDto } from "../dto/Content/Response/create-content-reponse.dto";
import { IBlobContentService } from "src/domain/interfaces/services/IBlobContentService";

@ApiBearerAuth()
@ApiTags("upload")
@Controller("upload")
export class ContentController {
  constructor(private readonly blobStorageService: IBlobContentService) {}

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
    const blobName: string = file.originalname;
    const blobBuffer: Buffer = file.buffer;
    return await this.blobStorageService.uploadFile(
      blobName,
      blobBuffer,
      contentType
    );
  }
}
