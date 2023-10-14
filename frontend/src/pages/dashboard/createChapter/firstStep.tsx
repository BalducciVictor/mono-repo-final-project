import React, { useState } from 'react';
import styled from 'styled-components';
import { TitleH1 } from '../../../components/Title';
import { Button } from '../../../components/atoms/button';
import { FormularInput } from '../../auth/components/molecules/FormularInput';
import { space } from '../../../styles/const';

interface FirstStepProps {
  setIsCourseCreation: (value: boolean) => void;
  updateChapterName: (value: string) => void;
  updateDescription: (value: string) => void;
  updateHasQuiz: (value: boolean) => void;
}

export const FirstStep: React.FC<FirstStepProps> = ({
  setIsCourseCreation,
  updateChapterName,
  updateDescription,
  updateHasQuiz,
}) => {
  const [chapterName, setChapterName] = useState('');
  const [description, setDescription] = useState('');
  const [hasQuiz, setHasQuiz] = useState(true);
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const validateForm = () => {
    let isValid = true;

    if (chapterName.trim() === '') {
      setNameError('Veuillez entrer un nom de chapitre');
      isValid = false;
    } else {
      setNameError('');
    }

    if (description.trim() === '') {
      setDescriptionError('Veuillez entrer une description');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    return isValid;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      updateChapterName(chapterName);
      updateDescription(description);
      updateHasQuiz(hasQuiz);
      setIsCourseCreation(false);
    }
  };

  return (
    <CreateChapterFirstStep>
      <WrapperBackground>
        <TitleH1>Créer un nouveau cours</TitleH1>
        <Form>
          <Wrapper>
            <FormularInput
              type="text"
              label="Nom"
              placeholder="Débutez avec Gatsby"
              value={chapterName}
              onChange={setChapterName}
            />
            <ErrorMessage>{nameError}</ErrorMessage>
          </Wrapper>
          <Wrapper>
            <FormularInput
              type="textarea"
              label="Description"
              placeholder="Tout savoir sur Gatsby"
              inputStyle={{ height: '150px', resize: 'none' }}
              value={description}
              onChange={setDescription}
            />
            <ErrorMessage>{descriptionError}</ErrorMessage>
          </Wrapper>
          <Wrapper>
            <FormularInput
              type="radio"
              label="Questionnaire de validation"
              options={['Oui', 'Non']}
              selectedOption={hasQuiz ? 'Oui' : 'Non'}
              onChange={option => setHasQuiz(option === 'Oui')}
            />
          </Wrapper>
          <Button onClick={handleNextStep} buttonStyle={{ width: '100%' }}>
            Débuter la création de mon cours
          </Button>
        </Form>
      </WrapperBackground>
    </CreateChapterFirstStep>
  );
};

const WrapperBackground = styled.div`
  background-color: white;
  padding: ${space.m};
  border-radius: ${space.xs};
`;

const Wrapper = styled.div`
  margin: ${space.ml} 0;
`;

const CreateChapterFirstStep = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 4px;
`;
