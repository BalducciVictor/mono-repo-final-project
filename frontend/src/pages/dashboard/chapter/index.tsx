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
  deleteChapterById,
} from '../../../services/api';
import { fontSize, color, space } from '../../../styles/const';
import { Link } from 'react-router-dom';

interface Chapters {
  _id: string;
  chapterName: string;
  category: string;
  description: string;
  timeToRead: string;
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
          setChapters(result);
          setAllChapters(result);
        } else {
          if (user.id) {
            const result = await getChaptersByUser(user.id);
            setChapters(result);
          }
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!selectedCompany) setChapters(allChapters);
    else {
      (async () => {
        try {
          const result = await getChapterByCompany(selectedCompany);
          setChapters(result);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (Search === '') {
      setFilteredChapters([]);
    } else {
      const filtered = Chapters.filter(chapter =>
        chapter.chapterName.toLowerCase().includes(Search.toLowerCase()),
      );
      setFilteredChapters(filtered);
    }
  }, [Search]);

  const handleDeleteChapter = async (id: string) => {
    try {
      await deleteChapterById(id);
      setChapters(prevChapters =>
        prevChapters.filter(chapter => chapter._id !== id),
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ChapterWrapper>
      <Header>
        <Title>Mes cours</Title>
        <SearchBarAndFilter>
          <SearchBar onChange={setSearch} />
          {user.role === 'ADMIN' && (
            <FilterRole onChange={setSelectedCompany} categories={allCompany} />
          )}
        </SearchBarAndFilter>
      </Header>

      {Chapters.length ? (
        <ListeOfChapter>
          {(filteredChapters.length > 0 || Search.length > 0
            ? filteredChapters
            : Chapters
          ).map((value: Chapters) => {
            return (
              <>
                <ChapterCard
                  key={value._id}
                  id={value._id}
                  chapterName={value.chapterName}
                  category={value.category}
                  description={value.description}
                  timeToRead={value.timeToRead}
                  role={user.role || ''}
                  handleDeleteChapter={handleDeleteChapter}
                />
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
  gap: ${space.m};
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
  gap: ${space.s};
`;

const SearchBarAndFilter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: ${space.ml};
`;
