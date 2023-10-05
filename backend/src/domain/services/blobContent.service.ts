import { Injectable } from "@nestjs/common";
import { BlobServiceClient } from "@azure/storage-blob";
import { CreateContentResponseDto } from "src/application/dto/Content/Response/create-content-reponse.dto";
import { IBlobContentService } from "../interfaces/services/IBlobContentService";

@Injectable()
export class BlobContentService implements IBlobContentService {
  private blobServiceClient: BlobServiceClient;

  constructor() {
    const connectionString = `DefaultEndpointsProtocol=https;AccountName=${process.env.STORAGE_ACCOUNT_NAME};AccountKey=${process.env.STORAGE_ACCOUNT_KEY};EndpointSuffix=core.windows.net`;

    this.blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
  }

  async uploadFile(
    blobName: string,
    content: Buffer,
    contentType: string
  ): Promise<CreateContentResponseDto> {
    const containerClient =
      this.blobServiceClient.getContainerClient("imagescontainer");
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const options = {
      blobHTTPHeaders: {
        blobContentType: contentType,
      },
    };
    await blockBlobClient.upload(content, content.length, options);
    const responseDto = new CreateContentResponseDto();
    responseDto.url = blockBlobClient.url;

    return responseDto;
  }
}
