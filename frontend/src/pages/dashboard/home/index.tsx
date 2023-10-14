import styled from 'styled-components';
import { TitleH1, TitleH2 } from '../../../components/Title';
import { IntroBlock } from './components/sections/introBlock';
import { CurrentChapters } from './components/sections/currentChapters';
import { Button } from '../../../components/button';
import { CompanyCard } from './components/molecules/CompanyCard';
import { PopUp } from '../../../components/PopUp';
import { useState, useEffect} from 'react';
import { useUser } from '../../../userContext';
import { UserList } from './components/userList';
import { UserFormData, UserRole } from '../../../types/usertypes';
import { CreateUserForm } from './components/formCreateUser';
import { CreateCompanyForm } from './components/organismes/formCreateCompany';
import { ModifierCompanyForm } from './components/organismes/formModifierCompany';
import { getAllCompany, postNewCompany, deleteCompany, putCompany } from '../../../services/api';
import { ActionButton } from './components/action';

import AddUserIllustration from '../../../assets/addUserIllu.svg';
import NewLeconIllustration from '../../../assets/newChapterIllu.svg';
import NewTeamIllusttration from '../../../assets/addUserIllu.svg';

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCompany, setIsModalOpenCompany] = useState(false);
  const [allCompany, setAllCompany] = useState<Company[]>([]);
  const [newCompany, setNewCompnay] = useState("");
  const [isModalOpenCompanyModifier, setIsModalOpenCompanyModifier] = useState(false);
  const [companyToModify, setCompanyToModify] = useState<Company>();
  const [isModalCreateUserOpen, setIsModalCreateUserOpen] = useState(false);
  const [isModalNewTeamOpen, setIsModalNewTeamOpen] = useState(false);
  const [isModalNewCourseOpen, setIsModalNewCourseOpen] = useState(false);
  const [userAdded, setUserAdded] = useState(false);
  const {user} = useUser();
  
  interface Company {
    _id: string;
    name: string;
    companyGroupe: [
      groupName: string,
      _id:string,
    ]
  };

  const handleSubmitForm = (data: UserFormData) => {
    console.log(data);
    setIsModalCreateUserOpen(false);
    setUserAdded(prev => !prev)
  };

  const handleSubmitNewCompany = async (event: any, data: string) => {
    event.preventDefault()
    try {
      const newCompanyAdd = await postNewCompany(newCompany);
      setAllCompany(prevCompanies => [...prevCompanies, newCompanyAdd]);
      setIsModalOpenCompany(false);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const HandleDeleteCompany = async (id: string) => {
    try {
      deleteCompany(id);
      setAllCompany(prevCompanies => prevCompanies.filter(company => company._id !== id));
    } catch(e: any) {
      console.log(e);
    }
  };

  const HandleModiferCompany = async (data: any) => {
    setCompanyToModify(data)
    setIsModalOpenCompanyModifier(true);
  };

  const HandleModifer = async (data: any) => {
    try {
      setIsModalOpenCompanyModifier(false);
      putCompany(data._id, data)
    } catch(e: any) {
      console.log(e)
    }
  };

  useEffect(() => {
    (async () => {
      try {
          const Company = await getAllCompany();
          setAllCompany(Company);
      } catch (e: any) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <HomeContainer>
      <TitleH1>Dashboard</TitleH1>
      {
        user.role == UserRole.Admin ?
        <div>
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
          <WrapperCompany>
            <h1>Mes Company</h1>
            <Button onClick={() => setIsModalOpenCompany(true)}>Creer une nouvelle company +</Button>
            <PopUp isOpen={isModalOpenCompany} onClose={() => {setIsModalOpenCompany(false)}}>
              <CreateCompanyForm companyName={newCompany} setCompanyName={setNewCompnay} handleSubmit={handleSubmitNewCompany}/>
            </PopUp>
            <ListCompany>
              {
                allCompany.map((value: any) => {
                  return (
                    <CompanyCard key={value._id} HandleDelete={HandleDeleteCompany} HandleModifier={HandleModiferCompany} CompanyName={value.name} CompanyId={value._id} companyData={value}/>
                  );
                })
              }
            </ListCompany>
            <PopUp isOpen={isModalOpenCompanyModifier} onClose={() => {setIsModalOpenCompanyModifier(false)}}>
              <ModifierCompanyForm companyGroupe={companyToModify} />
            </PopUp> 
          </WrapperCompany>
        </div>
        : ''
      }
    </HomeContainer>
  );
};

const HomeContainer = styled.div``;

const WrapperUser = styled.div`
  margin: 20px 0px;
`;

const WrapperCompany = styled.div`

`

const ListCompany = styled.ul`
  margin-top: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
const WrapperActions= styled.div`
  margin: 20px 0px;
  display: flex;
  flex-direction: row;
`
