import styled from 'styled-components';
import { TitleH1, TitleH2 } from '../../../components/Title';
import { IntroBlock } from './components/sections/introBlock';
import { CurrentChapters } from './components/sections/currentChapters';
import { Button } from '../../../components/button';
import { CompanyCard } from './components/molecules/CompanyCard';
import { PopUp } from '../../../components/PopUp';
import { useState, useEffect} from 'react';
import { useUser } from '../../../userContext';
import { UserFormData, UserRole } from '../../../types/usertypes';
import { CreateUserForm } from './components/formCreateUser';
import { CreateCompanyForm } from './components/organismes/formCreateCompany';
import { ModifierCompanyForm } from './components/organismes/formModifierCompany';
import { getAllCompany, postNewCompany, deleteCompany, putCompany } from '../../../services/api';

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCompany, setIsModalOpenCompany] = useState(false);
  const [allCompany, setAllCompany] = useState<Company[]>([]);
  const [newCompany, setNewCompnay] = useState("");
  const [isModalOpenCompanyModifier, setIsModalOpenCompanyModifier] = useState(false);
  const [companyToModify, setCompanyToModify] = useState<Company>();
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
    setIsModalOpen(false);
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
          <WrapperUser>
            <TitleH2>Gestion des utilisateurs</TitleH2>
            <Button onClick={() => setIsModalOpen(true)}>Creer un nouveau utilisateur</Button>
            <PopUp isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}}>
              <CreateUserForm onSubmit={handleSubmitForm}/>
            </PopUp> 
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
