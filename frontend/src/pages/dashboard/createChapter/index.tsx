import React, { useState } from 'react';
import { FirstStep } from './firstStep';
import { ChapterCreation } from './chapterCreation';

interface Document {
  title: string;
  step: number;
  documentationContent: {
    content: string;
    contentType: string;
  }[];
}

interface ChapterData {
  chapterName: string;
  hasQuiz: boolean;
  description: string;
  adminMail: string;
  documents: Document[];
}

export const CreateChapter: React.FC = () => {
  const [isCourseCreation, setIsCourseCreation] = useState(true);
  const [chapterData, setChapterData] = useState<ChapterData>({
    chapterName: '',
    hasQuiz: false,
    description: '',
    adminMail: '',
    documents: [],
  });

  const handleDocumentChange = (newDocuments: Document[]) => {
    setChapterData(prevData => ({
      ...prevData,
      documents: newDocuments,
    }));
  };

  const updateChapterName = (newChapterName: string) => {
    setChapterData(prevData => ({
      ...prevData,
      chapterName: newChapterName,
    }));
  };

  const updateDescription = (newDescription: string) => {
    setChapterData(prevData => ({
      ...prevData,
      description: newDescription,
    }));
  };

  const updateHasQuiz = (newHasQuiz: boolean) => {
    setChapterData(prevData => ({
      ...prevData,
      hasQuiz: newHasQuiz,
    }));
  };

  return !isCourseCreation ? (
    <>
      {console.log(chapterData)}
      <ChapterCreation
        courseTitle={chapterData.chapterName}
        documents={chapterData.documents}
        setDocuments={handleDocumentChange}
      />
    </>
  ) : (
    <FirstStep
      setIsCourseCreation={setIsCourseCreation}
      updateChapterName={updateChapterName}
      updateDescription={updateDescription}
      updateHasQuiz={updateHasQuiz}
    />
  );
};
