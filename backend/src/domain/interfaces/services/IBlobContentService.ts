import { CreateContentResponseDto } from "src/application/dto/Content/Response/create-content-reponse.dto";

export abstract class IBlobContentService {
  uploadFile: (
    blobName: string,
    content: Buffer,
    contentType: string
  ) => Promise<CreateContentResponseDto>;
}
