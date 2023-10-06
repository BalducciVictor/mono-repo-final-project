import { Injectable } from "@nestjs/common";
import { CreateContentResponseDto } from "src/application/dto/Content/Response/create-content-reponse.dto";
import { IBlobContentService } from "src/domain/interfaces/services/IBlobContentService";

@Injectable()
export class ContentUseCase {
  constructor(private blobStorageService: IBlobContentService) {}

  async uploadFile(
    file: Express.Multer.File,
    contentType: string
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
