import styled from 'styled-components';
import { TitleH1 } from '../../../components/Title';
import { IntroBlock } from './components/sections/introBlock';
import { CurrentChapters } from './components/sections/currentChapters';
import { Button } from '../../../components/button';
import { PopUp } from '../../../components/PopUp';
import { useState } from 'react';
import { useUser } from '../../../userContext';
import { UserFormData, UserRole } from '../../../types/usertypes';
import { CreateUserForm } from './components/formCreateUser';

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useUser();

  const handleSubmitForm = (data: UserFormData) => {
    console.log(data);
    setIsModalOpen(false);
  };
  
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
            <CreateUserForm onSubmit={handleSubmitForm}/>
          </PopUp> 
        </>
        : ''
      }
    </HomeContainer>
  );
};

const HomeContainer = styled.div``;
