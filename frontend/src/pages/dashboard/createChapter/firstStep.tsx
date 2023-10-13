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

  const handleNextStep = () => {
    updateChapterName(chapterName);
    updateDescription(description);
    updateHasQuiz(hasQuiz);
    setIsCourseCreation(false);
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
