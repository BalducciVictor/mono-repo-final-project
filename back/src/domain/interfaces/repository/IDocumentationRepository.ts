import { CreateDocumentationRequestDto } from "src/application/dto/Documentation/Request/create-documentation-request.dto";
import { Documentation } from "src/domain/entities/documentation";

export abstract class IDocumentationRepository {
  getDocumentation: (id: string) => Promise<Documentation | null>;
  createDocumentation: (documentation: Documentation) => Promise<Documentation>;
  updateDocumentation: (
    id: string,
    updatedDocumentation: Partial<Documentation>
  ) => Promise<Documentation | null>;
  deleteDocumentation: (id: string) => Promise<void>;
}
