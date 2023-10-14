import styled from 'styled-components';
import { space } from '../../../../../styles/const';
import { ProgressChapterCard } from '../progressChapterCard';
import { HeadSection } from '../headerSection';

export const CurrentChapters = () => {
  return (
    <CurrentChaptersStyled>
      <HeadSection title={'Vos chapitres en cours'} />
      <CardsStyled>
        <ProgressChapterCard
          name="Nom du chapitre"
          category="Catégorie du chapitre"
          progress={20}
        />
        <ProgressChapterCard
          name="Nom du chapitre"
          category="Catégorie du chapitre"
          progress={20}
        />
        <ProgressChapterCard
          name="Nom du chapitre"
          category="Catégorie du chapitre"
          progress={20}
        />
      </CardsStyled>
    </CurrentChaptersStyled>
  );
};

const CurrentChaptersStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardsStyled = styled.div`
  display: flex;
  margin-top: ${space.m};
  justify-content: space-between;
`;
