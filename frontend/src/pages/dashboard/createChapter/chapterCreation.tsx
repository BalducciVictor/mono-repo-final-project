import React, { useState } from 'react';
import styled from 'styled-components';
import { FormularInput } from '../../auth/components/molecules/FormularInput';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { color, fontSize, space } from '../../../styles/const';
import { TitleH1 } from '../../../components/Title';
import { Button } from '../../../components/atoms/button';

interface Document {
  title: string;
  step: number;
  documentationContent: {
    content: string;
    contentType: string;
  }[];
}

interface ChapterCreationProps {
  documents: Document[];
  courseTitle: string;
  setDocuments: (documents: Document[]) => void;
}

export const ChapterCreation = ({
  documents,
  courseTitle,
  setDocuments,
}: ChapterCreationProps) => {
  const [inputText, setInputText] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleAddChapter = () => {
    if (chapterTitle.trim() !== '' && inputText.trim() !== '') {
      const newChapter: Document = {
        title: chapterTitle,
        step: documents.length + 1,
        documentationContent: [
          {
            content: inputText,
            contentType: 'text',
          },
        ],
      };

      setDocuments([...documents, newChapter]);

      setChapterTitle('');
      setInputText('');
    }
  };

  return (
    <>
      <TitleH1 style={{ marginBottom: space.xs }}>
        Création d’un chapitre
      </TitleH1>
      <CourseTitleStyled>{courseTitle}</CourseTitleStyled>
      <RectanglesWrapper>
        {documents.map((document, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <Rectangle
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            />
            {hoveredIndex === index && (
              <TitleOverlay>
                {document.title.length > 10
                  ? document.title.slice(0, 10) + '...'
                  : document.title}
              </TitleOverlay>
            )}
          </div>
        ))}
        <PlusRectangle onClick={handleAddChapter}>+</PlusRectangle>
      </RectanglesWrapper>
      <AppWrapper>
        <InputsWrapper>
          <FormularInput
            type="title"
            label="Titre"
            placeholder="Saisissez du texte"
            value={chapterTitle}
            onChange={setChapterTitle}
          />
          <Wrapper>
            <FormularInput
              type="textarea"
              label="Text"
              placeholder="Saisissez du texte"
              value={inputText}
              onChange={setInputText}
              inputStyle={{ resize: 'none', height: '500px' }}
            />
          </Wrapper>
          <Button style={{ width: '100%' }} onClick={handleAddChapter}>
            Valider le chapitre
          </Button>
        </InputsWrapper>
        <PreviewWrapper>
          <TitleH1 style={{ marginBottom: space.m }}>{chapterTitle}</TitleH1>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{inputText}</ReactMarkdown>
        </PreviewWrapper>
      </AppWrapper>
    </>
  );
};

const CourseTitleStyled = styled.p`
  font-size: ${fontSize.l};
  color: ${color.medium.Manatee};
  margin-bottom: ${space.sm};
`;

const RectanglesWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: ${space.m} 0;
  flex-wrap: wrap;
`;

const Rectangle = styled.div`
  width: 100px;
  height: 20px;
  background-color: ${color.medium.mainGreen};
  margin-right: 5px;
  border-radius: 4px;
`;

const PlusRectangle = styled.div`
  width: 100px;
  height: 20px;
  background-color: #ccc;
  margin-right: 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
`;

const Wrapper = styled.div`
  margin: ${space.ml} 0;
`;

const AppWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputsWrapper = styled.div`
  margin-right: ${space.xl};
`;

const PreviewWrapper = styled.div`
  flex: 1;
  width: 100%;
  padding: ${space.ml};
  border-radius: 12px;
  background-color: #f8f8f8;
`;

const TitleOverlay = styled.div`
  position: absolute;
  top: -20px;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 5px;
  border-radius: 4px;
  font-size: ${fontSize.s};
`;
