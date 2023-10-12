import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ChapterCard } from "./components/organismes/ChapterCard";
import {getChapters} from "../../../services/api"
import { fontSize, color, space } from '../../../styles/const';

interface Chapters {
  _id:string,
  chapterName: string,
  category: string,
  description: string,
  timeRead: string,
}

export const Chapter = () => {
  const [Chapters, setChapters] = useState<Chapters[]>([]);

  useEffect(() => {
    (async () => {
      console.log("test")
      try {
        const result = await getChapters();
        setChapters(result);
      } catch (e: any) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <ChapterWrapper>
      <Title>Mes Chapitres</Title>
      {
        Chapters.length ? 
          <ListeOfChapter>
            {Chapters &&
              Chapters.map((value: Chapters) => {
                return (
                  <ChapterCard
                    id={value._id}
                    chapterName={value.chapterName}
                    category={value.category}
                    description={value.description}
                    timeRead={value.timeRead}
                  />
                );
              })}
          </ListeOfChapter>
        : <p>il y a aucun Chapitre de disponible</p>
      }
      </ChapterWrapper>
  );
};

const ChapterWrapper = styled.article`
`;

const Title = styled.h1`
  color: ${color.darker.fontDark};
  font-size: ${fontSize.xl};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: ${space.ml};
`

const ListeOfChapter = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${space.ml};
`
