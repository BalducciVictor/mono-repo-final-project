import { Injectable } from "@nestjs/common";
import { CreateDocumentationRequestDto } from "src/application/dto/Documentation/Request/create-documentation-request.dto";
import { GetDocumentationResponseDto } from "src/application/dto/Documentation/Response/get-documentation-response.dto";
import { Documentation } from "src/domain/entities/documentation";
import { DocumentationContent } from "src/domain/entities/documentationContent";
import { IDocumentationService } from "src/domain/interfaces/services/IDocumentationService";

@Injectable()
export class DocumentationUseCase {
  constructor(private readonly documentationService: IDocumentationService) {}

  async createDocumentationAndContent(
    documentationData: CreateDocumentationRequestDto
  ): Promise<Documentation> {
    const createdContents: Array<string> = [];

    await Promise.all(
      documentationData.documentationContent.map(async (contentData) => {
        const createdContent =
          await this.documentationService.createDocumentationContent(
            contentData
          );
        createdContents.push(createdContent._id);
      })
    );

    const documentationDataWithContentIds: Documentation = {
      ...documentationData,
      documentationContentId: createdContents,
    };

    const createdDocumentation =
      await this.documentationService.createDocumentation(
        documentationDataWithContentIds
      );

    return createdDocumentation;
  }

  async getDocumentationById(
    documentationId: string
  ): Promise<GetDocumentationResponseDto | null> {
    const contents: DocumentationContent[] = [];
    const documentWithIds: Documentation =
      await this.documentationService.getDocumentation(documentationId);
    for (const contentId of documentWithIds.documentationContentId) {
      const content = await this.documentationService.getDocumentationContent(
        contentId
      );
      if (content) {
        contents.push(content);
      }
    }

    const responseDto = new GetDocumentationResponseDto();
    responseDto.title = documentWithIds.title;
    responseDto.step = documentWithIds.step;
    responseDto.chapterId = documentWithIds.chapterId;
    responseDto.content = "";
    responseDto.documentationContent = contents;

    return responseDto;
  }
}
