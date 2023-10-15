import styled from 'styled-components';
import ChapterImage from '../../../../../assets/chapterCardimage.png';
import { getChapter } from '../../../../../services/api';
import { fontSize, color, space } from '../../../../../styles/const';
import { Button } from '../../../../../components/atoms/button';

type ChapterCardProps = {
  img?: string;
  id: string;
  chapterName?: string;
  category?: string;
  description?: any;
  timeToRead?: string;
  role?: string;
};

export const ChapterCard = ({
  id,
  img,
  chapterName,
  category,
  description,
  timeToRead,
  role,
}: ChapterCardProps) => {
  const goChapter = async (id: string) => {
    try {
      await getChapter(id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainWrapper>
      <section>
        <ImageChapter src={ChapterImage} alt="chapter" />
      </section>
      <RightSection>
        <Title>{chapterName}</Title>
        <Category>{category}</Category>
        <Description>{description}</Description>
        <BottomOfCard>
          <TimeToRead>Temps de lecture -{timeToRead}min</TimeToRead>
          <Button
            onClick={() => {
              goChapter(id);
            }}
          >
            {role === 'ADMIN' ? 'Modifier' : 'Accéder'}
          </Button>
        </BottomOfCard>
      </RightSection>
    </MainWrapper>
  );
};

const MainWrapper = styled.li`
  display: grid;
  grid-template-columns: 40% 1fr;
  gap: ${space.m};
  height: 185px;
  width: 410px;
  padding: ${space.m};
  border-radius: 10px;
  background: #fff;
  box-shadow: 2px 0px 20px 0px rgba(0, 0, 0, 0.1);
`;

const ImageChapter = styled.img`
  height: 100%;
`;

const RightSection = styled.section`
  display: grid;
  grid-template-rows: 13% 13% 50% 1fr;
`;

const Title = styled.h1`
  color: ${color.darker.fontDark};
  font-size: ${fontSize.m};
  font-style: normal;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Category = styled.h2`
  color: ${color.medium.fontGrey};
  font-size: ${fontSize.s};
  font-style: normal;
`;

const BottomOfCard = styled.div`
  display: flex;
  align-items: center;
`;

const Description = styled.p`
  color: ${color.darker.fontDark};
  font-size: ${fontSize.s};
  line-height: normal;
  max-height: 50px;
  overflow: hidden;
`;

const TimeToRead = styled.p`
  color: ${color.darker.fontDark};
  font-size: ${fontSize.xs};
`;
