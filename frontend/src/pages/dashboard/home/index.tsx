import styled from 'styled-components';
import { TitleH1 } from '../../../components/Title';
import { IntroBlock } from './components/sections/introBlock';
import { CurrentChapters } from './components/sections/currentChapters';
import { Button } from '../../../components/atoms/button';
import { PopUp } from '../../../components/PopUp';
import { useState } from 'react';
import { useUser } from '../../../userContext';
import { UserRole } from '../../../types/usertypes';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

  return (
    <HomeContainer>
      <TitleH1>Dashboard</TitleH1>
      <IntroBlock />
      <CurrentChapters />
      {user.role == UserRole.Admin ? (
        <>
          <Button onClick={() => setIsModalOpen(true)}>Create new user</Button>
          <PopUp
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
            }}
          >
            <h2>Ici le form</h2>
          </PopUp>
        </>
      ) : (
        ''
      )}
      <Link to="/dashboard/create-chapter">
        <Button>Create chapter</Button>
      </Link>
    </HomeContainer>
  );
};

const HomeContainer = styled.div``;
