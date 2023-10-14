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
import { ActionButton } from './components/action';

import AddUserIllustration from '../../../assets/addUserIllu.svg';
import NewLeconIllustration from '../../../assets/newChapterIllu.svg';
import NewTeamIllusttration from '../../../assets/addUserIllu.svg';

export const Home = () => {
  const [isModalCreateUserOpen, setIsModalCreateUserOpen] = useState(false);
  const [isModalNewTeamOpen, setIsModalNewTeamOpen] = useState(false);
  const [isModalNewCourseOpen, setIsModalNewCourseOpen] = useState(false);
  const [userAdded, setUserAdded] = useState(false);
  const {user} = useUser();

  const handleSubmitForm = (data: UserFormData) => {
    console.log(data);
    setIsModalCreateUserOpen(false);
    setUserAdded(prev => !prev)
  };
  
  return (
    <HomeContainer>
      <TitleH1>Dashboard</TitleH1>
      {
        user.role == UserRole.Admin ?
        <>
          <IntroBlock/>
          <WrapperUser>
            <TitleH2>Actions</TitleH2>
            <WrapperActions>
              <ActionButton text="Creer un nouveau utilisateur" imageSrc={AddUserIllustration} onClick={() => setIsModalCreateUserOpen(true)}/>
              <PopUp isOpen={isModalCreateUserOpen} onClose={() => {setIsModalCreateUserOpen(false)}}>
                <CreateUserForm onSubmit={handleSubmitForm}/>
              </PopUp>
              <ActionButton text="Creer un nouveau groupe d'utilisateurs" imageSrc={NewTeamIllusttration} onClick={() => setIsModalNewTeamOpen(true)}/>
              <PopUp isOpen={isModalNewTeamOpen} onClose={() => {setIsModalNewTeamOpen(false)}}>
                <p>Ici form new team</p>
              </PopUp>
              <ActionButton text="Creer un nouveau cours" imageSrc={NewLeconIllustration} onClick={() => setIsModalNewCourseOpen(true)}/>
              <PopUp isOpen={isModalNewCourseOpen} onClose={() => {setIsModalNewCourseOpen(false)}}>
                <p>Ici form new chapter</p>
              </PopUp>
            </WrapperActions>
            <TitleH2>Listes Utilisateurs</TitleH2>
            <UserList companyId={`${user.companyId}`} userAdded={userAdded} />
          </WrapperUser>
        </>
        : ''
      }
    </HomeContainer>
  );
};

const HomeContainer = styled.div``;

const WrapperUser = styled.div`
  margin: 20px 0px;
`;

const WrapperActions= styled.div`
  margin: 20px 0px;
  display: flex;
  flex-direction: row;
`