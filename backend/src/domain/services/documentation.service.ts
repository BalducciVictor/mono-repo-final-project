import { Injectable, NotFoundException } from "@nestjs/common";
import { IDocumentationService } from "../interfaces/services/IDocumentationService";
import { IDocumentationContentRepository } from "../interfaces/repository/IDocumentationContentRepository";
import { IDocumentationRepository } from "../interfaces/repository/IDocumentationRepository";
import { Documentation } from "../entities/documentation";
import { DocumentationContent } from "../entities/documentationContent";
import { CreateDocumentationRequestDto } from "src/application/dto/Documentation/Request/create-documentation-request.dto";

@Injectable()
export class DocumentationService implements IDocumentationService {
  constructor(
    private readonly documentationRepository: IDocumentationRepository,
    private readonly documentationContentRepository: IDocumentationContentRepository
  ) {}

  async createDocumentation(
    documentation: Documentation
  ): Promise<Documentation> {
    return this.documentationRepository.createDocumentation(documentation);
  }

  async getDocumentation(documentationId: string): Promise<Documentation> {
    const existingDocumentation =
      await this.documentationRepository.getDocumentation(documentationId);
    if (!existingDocumentation) {
      throw new NotFoundException("Documentation not found");
    }
    return existingDocumentation;
  }

  async updateDocumentation(
    documentationId: string,
    updatedDocumentation: Partial<Documentation>
  ): Promise<Documentation> {
    const existingDocumentation =
      await this.documentationRepository.getDocumentation(documentationId);
    if (!existingDocumentation) {
      throw new NotFoundException("Documentation not found");
    }
    const updatedDocumentationResult =
      await this.documentationRepository.updateDocumentation(
        documentationId,
        updatedDocumentation
      );
    return updatedDocumentationResult;
  }

  async deleteDocumentation(documentationId: string): Promise<void> {
    const existingDocumentation =
      await this.documentationRepository.getDocumentation(documentationId);
    if (!existingDocumentation) {
      throw new NotFoundException("Documentation not found");
    }
    await this.documentationRepository.deleteDocumentation(documentationId);
  }

  async createDocumentationContent(
    content: Partial<DocumentationContent>
  ): Promise<DocumentationContent> {
    console.log(content);
    return this.documentationContentRepository.createDocumentationContent(
      content
    );
  }

  async getDocumentationContent(
    contentId: string
  ): Promise<DocumentationContent> {
    const existingContent =
      await this.documentationContentRepository.getDocumentationContent(
        contentId
      );
    if (!existingContent) {
      throw new NotFoundException("Content not found");
    }
    return existingContent;
  }

  async updateDocumentationContent(
    contentId: string,
    updatedContent: Partial<DocumentationContent>
  ): Promise<DocumentationContent> {
    const existingContent =
      await this.documentationContentRepository.getDocumentationContent(
        contentId
      );
    if (!existingContent) {
      throw new NotFoundException("Content not found");
    }
    const updatedContentResult =
      await this.documentationContentRepository.updateDocumentationContent(
        contentId,
        updatedContent
      );
    return updatedContentResult;
  }

  async deleteDocumentationContent(contentId: string): Promise<void> {
    const existingContent =
      await this.documentationContentRepository.getDocumentationContent(
        contentId
      );
    if (!existingContent) {
      throw new NotFoundException("Content not found");
    }
    await this.documentationContentRepository.deleteDocumentationContent(
      contentId
    );
  }
}
