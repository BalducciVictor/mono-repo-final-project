import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ChapterCard } from "./components/organismes/ChapterCard";
import {getChapters} from "../../../services/api"
import { fontSize, color, space } from '../../../styles/const';

interface Chapters {
  id:string,
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
        setChapters([{
            id:"1234",
            chapterName: "Javascript",
            category: "language",
            description: "Lorem ipsum dolor sit amet consectetur. Nulla metus in eu neque tellus tellus dictumst eget amet. Nulla metus in eu neque tellus tellus dictumst",
            timeRead: "120"
          },
          {
            id:"2345",
            chapterName: "AdobeXD",
            category: "logicile",
            description: "Lorem ipsum dolor sit amet consectetur. Nulla metus in eu neque tellus tellus dictumst eget amet. Nulla metus in eu neque tellus tellus dictumst",
            timeRead: "120"
          },
          {
            id:"3456",
            chapterName: "Illustrator",
            category: "logicile",
            description: "Lorem ipsum dolor sit amet consectetur. Nulla metus in eu neque tellus tellus dictumst eget amet. Nulla metus in eu neque tellus tellus dictumst",
            timeRead: "120"
          },
        ]);
        console.log(e);
      }
    })();
  }, []);

  return (
    <ChapterWrapper>
      <Title>Mes Chapitres</Title>
      <ListeOfChapter>
        {Chapters &&
          Chapters.map((value: Chapters) => {
            return (
              <ChapterCard
                id={value.id}
                chapterName={value.chapterName}
                category={value.category}
                description={value.description}
                timeRead={value.timeRead}
              />
            );
          })}
      </ListeOfChapter>
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
