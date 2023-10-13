import styled from 'styled-components';
import { TitleH1, TitleH2 } from '../../../components/Title';
import { IntroBlock } from './components/sections/introBlock';
import { CurrentChapters } from './components/sections/currentChapters';
import { Button } from '../../../components/button';
import { PopUp } from '../../../components/PopUp';
import { useState } from 'react';
import { useUser } from '../../../userContext';
import { UserList } from './components/userList';
import { UserFormData, UserRole } from '../../../types/usertypes';
import { CreateUserForm } from './components/formCreateUser';

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userAdded, setUserAdded] = useState(false);
  const {user} = useUser();

  const handleSubmitForm = (data: UserFormData) => {
    console.log(data);
    setIsModalOpen(false);
    setUserAdded(prev => !prev)
  };
  
  return (
    <HomeContainer>
      <TitleH1>Dashboard</TitleH1>
      {
        user.role == UserRole.Admin ?
        <WrapperUser>
          <TitleH2>Gestion des utilisateurs</TitleH2>
          <Button onClick={() => setIsModalOpen(true)}>Creer un nouveau utilisateur</Button>
          <PopUp isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}}>
            <CreateUserForm onSubmit={handleSubmitForm}/>
          </PopUp> 
          <UserList companyId={`${user.companyId}`} userAdded={userAdded} />
        </WrapperUser>
        : ''
      }
    </HomeContainer>
  );
};

const HomeContainer = styled.div``;

const WrapperUser = styled.div`
  margin: 20px 0px;
`;
