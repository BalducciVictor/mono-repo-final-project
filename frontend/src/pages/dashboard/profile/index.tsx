import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useUser } from '../../../userContext';
import { IntroBlock } from './components/molecules/introBlock';
import { ProfileCadre } from './components/organismes/ProfileCadre';
import { fontSize, color, space } from '../../../styles/const';
import { getCompanyById, putUserInfoByUser } from "../../../services/api"

export const Profile = () => {
  const { user, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [company, setCompagny] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    (async () => {
      try {
        if(user.companyId) {
          const Company = await getCompanyById(user.companyId);
          setCompagny(Company.name);
        }
      } catch (e: any) {
        console.log(e);
      }
    })();
  }, []);

  const handleLogin = () => {
    try {
      if(user.id) {
        putUserInfoByUser(user.id, {email})
      }
    } catch(e:any) {
      console.log(e);
    }
};

  return (
    <ProfileWrapper>
      <Title>Mes Infos Personnelle</Title>
      {
        user.role === "USER" &&
        <ProfileUserWrapper>
          <IntroBlock firstName={user.firstName}/>
          <ProfileCadre
            id={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            companyName={company}
            handleLogin={handleLogin}
          />
        </ProfileUserWrapper>
      }
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ProfileUserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const Title = styled.h1`
  color: ${color.darker.fontDark};
  font-size: ${fontSize.xl};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: ${space.ml};
`
