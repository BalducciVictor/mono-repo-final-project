import { DocumentationContent } from "src/domain/entities/documentationContent";

export abstract class IDocumentationContentRepository {
  getDocumentationContent: (id: string) => Promise<DocumentationContent | null>;
  createDocumentationContent: (
    documentation: Partial<DocumentationContent>
  ) => Promise<DocumentationContent>;
  updateDocumentationContent: (
    id: string,
    updatedDocumentation: Partial<DocumentationContent>
  ) => Promise<DocumentationContent | null>;
  deleteDocumentationContent: (id: string) => Promise<void>;
}
