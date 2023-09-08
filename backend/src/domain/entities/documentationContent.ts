import { DocumentationContentType } from "./documentationContentType";

export class DocumentationContent {
  readonly _id?: number;
  content: string;
  contentType: DocumentationContentType;
}
