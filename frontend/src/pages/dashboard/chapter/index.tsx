import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useUser } from '../../../userContext';
import { ChapterCard } from './components/organismes/ChapterCard';
import { SearchBar } from './components/molecules/SearchBar';
import { FilterRole } from './components/molecules/FilterRole';
import {
  getChapters,
  getChaptersByUser,
  getAllCompany,
  getChapterByCompany,
} from '../../../services/api';
import { fontSize, color, space } from '../../../styles/const';
import { Link } from 'react-router-dom';

interface Chapters {
  _id: string;
  chapterName: string;
  category: string;
  description: string;
  timeRead: string;
}

interface Company {
  _id: string;
  name: string;
}

export const Chapter = () => {
  const [allChapters, setAllChapters] = useState<Chapters[]>([]);
  const [Chapters, setChapters] = useState<Chapters[]>([]);
  const [allCompany, setAllCompany] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const { user, setUser } = useUser();
  const [Search, setSearch] = useState<string>('');
  const [filteredChapters, setFilteredChapters] = useState<Chapters[]>([]);

  useEffect(() => {
    (async () => {
      try {
        if (user.role === 'ADMIN') {
          const allCompany = await getAllCompany();
          const result = await getChapters();
          setAllCompany(allCompany);
          setAllChapters(result);
          if (!selectedCompany) {
            setChapters(result);
          } else {
            const chapterResult = await getChapterByCompany(selectedCompany);
            setChapters(chapterResult);
          }
        } else {
          if (user.id) {
            const result = await getChaptersByUser(user.id);
            setChapters(result);
          }
        }

        if (Search === '') {
          setFilteredChapters([]);
        } else {
          const filtered = allChapters.filter(chapter =>
            chapter.chapterName.toLowerCase().includes(Search.toLowerCase()),
          );
          setFilteredChapters(filtered);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [user, selectedCompany, Search, allChapters]);

  return (
    <ChapterWrapper>
      <Header>
        <Title>Mes Chapitres</Title>
        <SearchBar onChange={setSearch} />
      </Header>
      {user.role === 'ADMIN' && (
        <FilterRole onChange={setSelectedCompany} categories={allCompany} />
      )}
      {Chapters.length ? (
        <ListeOfChapter>
          {(filteredChapters.length > 0 || Search.length > 0
            ? filteredChapters
            : Chapters
          ).map((value: Chapters) => {
            return (
              <>
                {console.log('test', value)}
                <Link to={`/dashboard/chapter/${value._id}`}>
                  <ChapterCard
                    key={value._id}
                    id={value._id}
                    chapterName={value.chapterName}
                    category={value.category}
                    description={value.description}
                    timeRead={value.timeRead}
                    role={user.role || ''}
                  />
                </Link>
              </>
            );
          })}
        </ListeOfChapter>
      ) : (
        <p>il y a aucun Chapitre de disponible</p>
      )}
    </ChapterWrapper>
  );
};

const ChapterWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${space.ml};
`;

const Title = styled.h1`
  color: ${color.darker.fontDark};
  font-size: ${fontSize.xl};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ListeOfChapter = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${space.ml};
`;
