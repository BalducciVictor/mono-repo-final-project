import styled from 'styled-components';
import { TitleH1 } from '../../../components/Title';
import { IntroBlock } from './components/sections/introBlock';
import { CurrentChapters } from './components/sections/currentChapters';
import { Button } from '../../../components/button';
import { PopUp } from '../../../components/PopUp';
import { useState } from 'react';
import { useUser } from '../../../userContext';
import { UserRole } from '../../../types/usertypes';
import { UserList } from './components/userList';

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const {user} = useUser();
  
  return (
    <HomeContainer>
      <TitleH1>Dashboard</TitleH1>
      <IntroBlock />
      <CurrentChapters />
      {
        user.role == UserRole.Admin ?
        <>
          <Button onClick={() => setIsModalOpen(true)}>Create new user</Button>
          <PopUp isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}}>
            <h2>Ici le form</h2>
          </PopUp> 
          <Button onClick={() => setIsUserListOpen(true)}>Afficher les utilisateurs</Button>
          <PopUp isOpen={isUserListOpen} onClose={() => setIsUserListOpen(false)}>
            <UserList companyId={/* someCompanyId */1} />
          </PopUp>
        </>
        : ''
      }
    </HomeContainer>
  );
};

const HomeContainer = styled.div``;
