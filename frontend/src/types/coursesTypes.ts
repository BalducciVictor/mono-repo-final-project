export interface Documentations {
  title: string;
  step: number;
  documentationContent: {
    content: string;
    contentType: string;
  }[];
}

export interface CourseData {
  chapterName: string;
  hasQuiz: boolean;
  description: string;
  category: string;
  timeToRead: number;
  companyId: string;
  documentation: Documentations[];
}

export interface FileData {
  file: any;
}
