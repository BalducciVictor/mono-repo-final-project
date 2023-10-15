import React, { useState } from 'react';
import { FirstStep } from './firstStep';
import { ChapterCreation } from './chapterCreation';
import { CourseData, Documentations } from '../../../types/coursesTypes';
import { postCourse } from '../../../services/api';

export const CreateChapter: React.FC = () => {
  const [isCourseCreation, setIsCourseCreation] = useState(true);
  const [chapterData, setChapterData] = useState<CourseData>({
    chapterName: '',
    hasQuiz: false,
    category: '',
    description: '',
    timeToRead: 0,
    companyId: '',
    documentation: [],
  });
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  const handleDocumentChange = (newDocuments: Documentations[]) => {
    setChapterData(prevData => ({
      ...prevData,
      documentation: newDocuments,
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

  const updateCategory = (newCategory: string) => {
    setChapterData(prevData => ({
      ...prevData,
      category: newCategory,
    }));
  };

  const updateTimeToRead = (newTimeToRead: string) => {
    const timeToReadNumber = parseInt(newTimeToRead);
    setChapterData(prevData => ({
      ...prevData,
      timeToRead: timeToReadNumber,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postCourse(chapterData);
      setApiMessage('Chapitre bien créé');
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        setApiMessage(err.message);
      } else {
        setApiMessage("Une erreur inconnue s'est produite");
      }
    }
  };

  return !isCourseCreation ? (
    <ChapterCreation
      courseTitle={chapterData.chapterName}
      documentations={chapterData.documentation}
      setDocuments={handleDocumentChange}
      handleSubmit={handleSubmit}
    />
  ) : (
    <FirstStep
      setIsCourseCreation={setIsCourseCreation}
      updateChapterName={updateChapterName}
      updateDescription={updateDescription}
      updateHasQuiz={updateHasQuiz}
      updateCategory={updateCategory}
      updateTimeToRead={updateTimeToRead}
    />
  );
};
