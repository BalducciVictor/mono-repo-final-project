import { DocumentationContent } from './documentationContent';

export class Documentation {
  readonly _id?: string;
  title: string;
  step: number;
  chapterId: number;
  content: DocumentationContent[];
}
