import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DocumentationContent } from "src/domain/entities/documentationContent";
import { CreateDocumentationContentResponseDto } from "src/application/dto/Documentation/DocumentationContent/Response/documentation-content-response.dto";

@Injectable()
export class DocumentationContentRepository {
  constructor(
    @InjectModel(DocumentationContent.name)
    private documentationContentModel: Model<DocumentationContent>
  ) {}

  async createDocumentationContent(
    content: DocumentationContent
  ): Promise<CreateDocumentationContentResponseDto> {
    const createdContent = new this.documentationContentModel(content);
    const savedContent = await createdContent.save();

    return this.mapToResponseDto(savedContent);
  }

  private mapToResponseDto(
    content: DocumentationContent
  ): CreateDocumentationContentResponseDto {
    return {
      _id: content._id.toString(),
      content: content.content,
      contentType: content.contentType,
    };
  }

  async getDocumentationContent(
    id: string
  ): Promise<DocumentationContent | null> {
    return this.documentationContentModel.findById(id).exec();
  }

  async updateDocumentationContent(
    id: string,
    updateData: Partial<DocumentationContent>
  ): Promise<DocumentationContent | null> {
    return this.documentationContentModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async deleteDocumentationContent(id: string): Promise<void> {
    await this.documentationContentModel.findByIdAndDelete(id).exec();
  }
}
