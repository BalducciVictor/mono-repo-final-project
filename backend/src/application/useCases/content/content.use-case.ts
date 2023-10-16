import { Injectable } from "@nestjs/common";
import { CreateContentResponseDto } from "../../../application/dto/Content/Response/create-content-reponse.dto";
import { IBlobContentService } from "../../../domain/interfaces/services/IBlobContentService";

@Injectable()
export class ContentUseCase {
  constructor(private blobStorageService: IBlobContentService) {}

  async uploadFile(
    file: Express.Multer.File,
    contentType: string
  ): Promise<CreateContentResponseDto> {
    const blobName = `${file.originalname}-${Date.now()}`;
    const blobBuffer: Buffer = file.buffer;
    return await this.blobStorageService.uploadFile(
      blobName,
      blobBuffer,
      contentType
    );
  }

  async deleteFile(fileName: string): Promise<void> {
    return await this.blobStorageService.deleteFile(fileName);
  }
}
