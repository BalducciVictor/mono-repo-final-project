import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { color, fontSize, space } from '../../../styles/const';
import ReactMarkdown from 'react-markdown';
import { ChapterRectangles } from '../chapter/components/organismes/ChapterRectangles';
import { TitleH1 } from '../../../components/Title';
import ChapterPreview from '../chapter/components/organismes/ChapterPreview';
import { getChapterById } from '../../../services/api';

import { useParams } from 'react-router-dom';
import { Button } from '../../../components/atoms/button';

interface Chapter {
  category: string;
  chapterName: string;
  companyId: string;
  description: string;
  documentation: {
    title: string;
    step: number;
    documentationContent: {
      content: string;
      contentType: string;
    }[];
  }[];
  hasQuiz: boolean;
  questionnaire: any[];
  timeToRead: number;
  viewedBy: string[];
}

export const ReadChapter = () => {
  const { uuid } = useParams();
  const [chapter, setChapter] = useState<Chapter>({
    category: '',
    chapterName: '',
    companyId: '',
    description: '',
    documentation: [],
    hasQuiz: false,
    questionnaire: [],
    timeToRead: 0,
    viewedBy: [],
  });
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    (async () => {
      const chapterResult = await getChapterById(uuid ? uuid : '');
      setChapter(chapterResult);
    })();
  }, [uuid]);

  return (
    <>
      <TitleH1 style={{ marginBottom: space.xs }}>
        {chapter.chapterName}
      </TitleH1>
      <CourseCategoryStyled>{chapter.category}</CourseCategoryStyled>
      <ChapterRectangles
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        documentations={chapter.documentation}
      />
      <ChapterPreview
        chapterTitle={chapter.documentation[currentStep]?.title || ''}
        text={
          chapter.documentation[currentStep]?.documentationContent
            .map(content => content.content)
            .join('') || ''
        }
      />
      <Button
        variant="highlighted"
        style={{ marginRight: space.s }}
        onClick={() => currentStep !== 0 && setCurrentStep(currentStep - 1)}
      >
        Revenir au chapitre précédent
      </Button>
      <Button
        style={{ marginTop: space.m }}
        onClick={() =>
          currentStep < chapter.documentation.length - 1 &&
          setCurrentStep(currentStep + 1)
        }
      >
        Passer au chapitre suivant
      </Button>
    </>
  );
};

const CourseCategoryStyled = styled.p`
  font-size: ${fontSize.l};
  color: ${color.medium.Manatee};
  margin-bottom: ${space.sm};
`;
