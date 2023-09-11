import { CreateDocumentationRequestDto } from "src/application/dto/Documentation/Request/create-documentation-request.dto";
import { Documentation } from "src/domain/entities/documentation";
import { DocumentationContent } from "src/domain/entities/documentationContent";

export abstract class IDocumentationService {
  // Documentation
  createDocumentation: (documentation: Documentation) => Promise<Documentation>;
  getDocumentation: (documentationId: string) => Promise<Documentation>;
  updateDocumentation: (
    documentationId: string,
    updatedDocumentation: Partial<Documentation>
  ) => Promise<Documentation>;
  deleteDocumentation: (documentationId: string) => Promise<void>;

  //DocumenationContent
  createDocumentationContent: (
    content: DocumentationContent
  ) => Promise<DocumentationContent>;
  getDocumentationContent: (contentId: string) => Promise<DocumentationContent>;
  updateDocumentationContent: (
    contentId: string,
    updatedContent: Partial<DocumentationContent>
  ) => Promise<DocumentationContent>;
}
