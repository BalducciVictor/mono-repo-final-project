import styled from 'styled-components';
import { TitleH1, TitleH2 } from '../../../components/Title';
import { IntroBlock } from './components/sections/introBlock';
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
// import { ActionButton } from './components/action';

import AddUserIllustration from '../../../assets/addUserIllu.svg';
import NewLeconIllustration from '../../../assets/newChapterIllu.svg';
import NewTeamIllusttration from '../../../assets/addUserIllu.svg';
import { Button } from '../../../components/atoms/button';
import { Link } from 'react-router-dom';
import { space } from '../../../styles/const';
import { ActionButton } from './components/action';
import { HeadSection } from './components/headerSection';

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCompany, setIsModalOpenCompany] = useState(false);
  const [allCompany, setAllCompany] = useState<Company[]>([]);
  const [newCompany, setNewCompnay] = useState("");
  const [isModalOpenCompanyModifier, setIsModalOpenCompanyModifier] = useState(false);
  const [companyToModify, setCompanyToModify] = useState<Company>();
  const [isModalCreateUserOpen, setIsModalCreateUserOpen] = useState(false);
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
      const newObjects = allCompany.map((obj:any) =>
        obj._id === data._id ? data : obj
      );
      setAllCompany(newObjects);
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
      <TitleH1>Accueil</TitleH1>
      <IntroBlock/> 
      <HeadSection title='Vos actions'/>
      <ActionButtonsWrapper>
        <div>
          <ActionButton imageSrc={AddUserIllustration} text="Créer un nouvel utilisateur" onClick={() => setIsModalCreateUserOpen(true)}/>
          <PopUp isOpen={isModalCreateUserOpen} onClose={() => {setIsModalCreateUserOpen(false)}}>
            <CreateUserForm onSubmit={handleSubmitForm}/>
          </PopUp>
        </div>
        <div>
        <Link style={{color: "black"}} to='/dashboard/create-chapter'>
          <ActionButton imageSrc={NewLeconIllustration} text="Créer un nouveau cours" onClick={() => setIsModalNewCourseOpen(true)}/>
        </Link>
        </div>
        {user.role === "SUPERADMIN" && 
        <div>
          <ActionButton imageSrc={NewLeconIllustration} text="Créer une entreprise" onClick={() => setIsModalOpenCompany(true)}/>
          <PopUp isOpen={isModalOpenCompany} onClose={() => {setIsModalOpenCompany(false)}}>
            <CreateCompanyForm companyName={newCompany} setCompanyName={setNewCompnay} handleSubmit={handleSubmitNewCompany}/>
          </PopUp>
        </div>
        }
        </ActionButtonsWrapper>
        <UsersAndComapniesWrapper>
        {(user.role === "SUPERADMIN" || user.role === 'ADMIN') && 
          <div>
            <HeadSection title='Liste des utilisateurs' buttonTitle='+' onClick={() => setIsModalCreateUserOpen(true)}/>
            <UserList companyId={`${user.companyId}`} userAdded={userAdded} />
          </div>}
          {user.role === "SUPERADMIN" &&
          <div>
            <HeadSection title='Liste des entreprises' buttonTitle='+' onClick={() => setIsModalOpenCompany(true)} />
            <ListCompany>
              {
              allCompany.map((value: any) => {
                return (
                    <CompanyCard key={value._id} HandleDelete={HandleDeleteCompany} HandleModifier={HandleModiferCompany} CompanyName={value.name} CompanyId={value._id} companyData={value}/>
                  );
                })
              }
              <PopUp isOpen={isModalOpenCompanyModifier} onClose={() => {setIsModalOpenCompanyModifier(false)}}>
                <ModifierCompanyForm updatedCompany={HandleModifer} companyGroupe={companyToModify} />
              </PopUp>
            </ListCompany>
          </div>
          }
        </UsersAndComapniesWrapper>
    </HomeContainer>
  );
};


const UsersAndComapniesWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: ${space.m};
`

const ActionButtonsWrapper = styled.div`
  display: flex;
  gap: ${space.s};
`

const HomeContainer = styled.div``;


const ListCompany = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: wrap;
`;
