import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FormularInput } from '../../auth/components/molecules/FormularInput';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { color, fontSize, space } from '../../../styles/const';
import { TitleH1 } from '../../../components/Title';
import { Button } from '../../../components/atoms/button';
import { Documentations } from '../../../types/coursesTypes';
import { ChapterRectangles } from '../chapter/components/organismes/ChapterRectangles';
import ChapterPreview from '../chapter/components/organismes/ChapterPreview';
import { PostFile } from '../../../services/api';

interface ChapterCreationProps {
  documentations: Documentations[];
  courseTitle: string;
  setDocuments: (documentations: Documentations[]) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const ChapterCreation = ({
  documentations,
  courseTitle,
  setDocuments,
  handleSubmit,
}: ChapterCreationProps) => {
  const [inputText, setInputText] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleAddChapter = () => {
    if (chapterTitle.trim() !== '' && inputText.trim() !== '') {
      const newChapter: Documentations = {
        title: chapterTitle,
        step: documentations.length + 1,
        documentationContent: [
          {
            content: inputText,
            contentType: 'text',
          },
        ],
      };

      setDocuments([...documentations, newChapter]);
      setChapterTitle('');
      setInputText('');
    }
  };

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setSelectedImage(selectedFile);
    }
  };

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handlePostFile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append('file', selectedImage);

        const response = await PostFile(selectedImage.type, formData);
      }
    } catch (err) {
      return;
    }
  };

  return (
    <>
      <TitleH1 style={{ marginBottom: space.xs }}>Création du cours</TitleH1>
      {console.log('selectedImage', selectedImage)}
      <CourseTitleStyled>{courseTitle}</CourseTitleStyled>
      <StepsCreationWrapper>
        <ChapterRectangles
          documentations={documentations}
          handleAddChapter={handleAddChapter}
          isCreation={true}
        />
        <Button style={{ height: '40px' }} onClick={e => handleSubmit(e)}>
          Envoyer le cours
        </Button>
      </StepsCreationWrapper>
      <AppWrapper>
        <InputsWrapper>
          <FormularInput
            type="title"
            label="Titre du chapitre"
            placeholder="Saisissez du texte"
            value={chapterTitle}
            onChange={setChapterTitle}
          />
          <Wrapper>
            <FormularInput
              type="textarea"
              label="Contenu du chapitre"
              placeholder="Saisissez du texte"
              value={inputText}
              onChange={setInputText}
              inputStyle={{ resize: 'none', height: '500px' }}
            />
          </Wrapper>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelection}
            style={{ display: 'none' }}
            ref={inputFileRef}
          />
          {/* <Button onClick={() => inputFileRef.current?.click()}>
            Sélectionner une image
          </Button>
          <Button onClick={handlePostFile}>Validate</Button> */}
          <Button style={{ width: '100%' }} onClick={handleAddChapter}>
            Valider le chapitre
          </Button>
        </InputsWrapper>
        <ChapterPreview chapterTitle={chapterTitle} text={inputText} />
      </AppWrapper>
    </>
  );
};

const StepsCreationWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const CourseTitleStyled = styled.p`
  font-size: ${fontSize.l};
  color: ${color.medium.Manatee};
  margin-bottom: ${space.sm};
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
