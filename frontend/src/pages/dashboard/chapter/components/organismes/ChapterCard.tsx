import styled from 'styled-components';
import ChapterImage from '../../../../../assets/chapterCardimage.png';
import { deleteChapterById, getChapter } from '../../../../../services/api';
import { fontSize, color, space } from '../../../../../styles/const';
import { Button } from '../../../../../components/atoms/button';
import { Link } from 'react-router-dom';

type ChapterCardProps = {
  img?: string;
  id: string;
  chapterName?: string;
  category?: string;
  description?: any;
  timeToRead?: string;
  role?: string;
  handleDeleteChapter: (id: string) => void;
};

export const ChapterCard = ({
  id,
  img,
  chapterName,
  category,
  description,
  timeToRead,
  role,
  handleDeleteChapter,
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
      <ImageChapter src={ChapterImage} alt="chapter" />
      <div>
        <RightSection>
          <Title>{chapterName}</Title>
          <Category>{category}</Category>
          <Description>
            {description.length > 100
              ? description.slice(0, 100) + '...'
              : description}
          </Description>
        </RightSection>
        <BottomOfCard>
          <TimeToRead>Temps de lecture -{timeToRead}min</TimeToRead>
          <Link to={`/dashboard/chapter/${id}`}>
            <Button
              style={{ padding: space.xs, borderRadius: '4px' }}
              onClick={() => {
                goChapter(id);
              }}
            >
              {role === 'ADMIN' ? 'Accéder' : 'Accéder'}
            </Button>
          </Link>
          {role === 'ADMIN' ||
            ('SUPERADMIN' && (
              <Button
                style={{
                  background: color.error.lightError,
                  padding: space.xs,
                  borderRadius: '4px',
                }}
                onClick={() => {
                  handleDeleteChapter(id);
                }}
              >
                Suprimer
              </Button>
            ))}
        </BottomOfCard>
      </div>
    </MainWrapper>
  );
};

const MainWrapper = styled.li`
  display: flex;
  align-items: center;
  border-radius: 8px;
  width: 400px;
  height: 200px;
  padding: ${space.m};
  background: #fff;
  box-shadow: 2px 0px 20px 0px rgba(0, 0, 0, 0.1);
`;

const ImageChapter = styled.img`
  height: 75px;
  align-self: flex-start;
`;

const RightSection = styled.section`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  height: 100%;
  margin-left: ${space.xs};
`;

const Title = styled.h1`
  color: ${color.darker.fontDark};
  font-size: ${fontSize.m};
  font-style: normal;
  width: 100%;
  overflow: hidden;
  line-height: 1.2;
`;

const Category = styled.h2`
  color: ${color.medium.fontGrey};
  font-size: ${fontSize.s};
  font-style: normal;
  margin-top: ${space.xxs};
`;

const BottomOfCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${space.xs};
  margin-top: ${space.xxs};
`;

const Description = styled.p`
  color: ${color.darker.fontDark};
  font-size: ${fontSize.s};
  margin: ${space.s} 0;
  line-height: 1.1;
`;

const TimeToRead = styled.p`
  color: ${color.darker.fontDark};
  font-size: ${fontSize.xs};
`;
