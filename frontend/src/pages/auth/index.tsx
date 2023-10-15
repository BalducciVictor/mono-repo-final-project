import styled from 'styled-components';
import { useState } from 'react';
import { MainLogo } from '../../components/icons/mainLogo';
import { FormularInput } from './components/molecules/FormularInput';
import { useMutation } from 'react-query';
import AuthImage from '../../assets/auth.png';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../userContext';
import { fontSize } from '../../styles/const';
import sessionAPI from '../../services/sessionStorageAPI';
import { signIn } from '../../services/api';

export const Auth = () => {
  const [adminAuth, setAdminAuth] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const mutation = useMutation(() => signIn(email, password));
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  function changeAuth(admin: boolean) {
    setAdminAuth(admin);
  }

  const handleLogin = () => {
    mutation.mutate();
  };

  if (mutation.isSuccess) {
    setUser({
      role: `${mutation.data.user.role}`,
      id: mutation.data.user._id,
      companyId: mutation.data.user.companyId,
      currentChapterId: mutation.data.user.currentChapterId,
      currentChapterStepId: mutation.data.user.currentChapterStepId,
      email: `${mutation.data.user.email}`,
      firstName: `${mutation.data.user.firstName}`,
      lastName: `${mutation.data.user.lastName}`,
      validatedChapterId: mutation.data.user.lastName,
      refreshToken: mutation.data.user.refreshToken,
    });
    sessionAPI.setToken(`${mutation.data.accessToken}`);
    sessionAPI.setUser({
      role: `${mutation.data.user.role}`,
      id: mutation.data.user._id,
      companyId: mutation.data.user.companyId,
      currentChapterId: mutation.data.user.currentChapterId,
      currentChapterStepId: mutation.data.user.currentChapterStepId,
      email: `${mutation.data.user.email}`,
      firstName: `${mutation.data.user.firstName}`,
      lastName: `${mutation.data.user.lastName}`,
      validatedChapterId: mutation.data.user.lastName,
      refreshToken: mutation.data.user.refreshToken,
    });
    navigate('/dashboard');
  }

  return (
    <MainWrapper>
      <LeftSection>
        <MainLogo />
        <LeftContent>
          <LeftTitle>Welcome Back!</LeftTitle>
          <LeftDescription>
            Merci de choisir votre profil pour vous connecter
          </LeftDescription>
          <LeftChoiceAuth>
            <LeftChoice
              onClick={() => changeAuth(false)}
              adminAuth={!adminAuth}
            >
              Collaborateur
            </LeftChoice>
            <LeftChoice onClick={() => changeAuth(true)} adminAuth={adminAuth}>
              Admin
            </LeftChoice>
          </LeftChoiceAuth>
          {adminAuth ? (
            <LeftFrom>
              <FormularInput
                label={'Email'}
                placeholder={'mail@exemple.com'}
                type={'mail'}
                value={email}
                onChange={setEmail}
              />
              <FormularInput
                label={'Mot de passe'}
                placeholder={'Min. 8 characters'}
                type={'password'}
                value={password}
                onChange={setPassword}
              />
            </LeftFrom>
          ) : (
            <LeftFrom>
              <FormularInput
                label={'Email'}
                placeholder={'mail@exemple.com'}
                type={'mail'}
                value={email}
                onChange={setEmail}
              />
              <FormularInput
                label={'Mot de passe'}
                placeholder={'Min. 8 characters'}
                type={'password'}
                value={password}
                onChange={setPassword}
              />
            </LeftFrom>
          )}
          {/* <Link to="/dashboard/home"> */}
          <LeftButton onClick={handleLogin}>Se connecter</LeftButton>
          {/* </Link> */}
        </LeftContent>
      </LeftSection>
      <RightSection>
        <RightImage src={AuthImage} alt="auth icon" />
        <RightTitle>Bienvenue sur Onby !</RightTitle>
        <RightDescription>
          Vous avez récemment rejoint notre groupe, avant tout bienvenue ! Onby
          est une plateforme interne qui va vous accompagner à vous connecter à
          notre environnement de développement afin d’avoir accès à nos
          produits.
        </RightDescription>
      </RightSection>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
`;

const LeftSection = styled.section`
  display: grid;
  grid-template-rows: 30px 1fr;
  padding: 30px;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  width: fit-content;
  justify-self: center;
`;

const LeftTitle = styled.h1`
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
`;

const LeftDescription = styled.p`
  color: #565656;
  font-size: ${fontSize.s};
  font-style: normal;
  font-weight: 500;
  margin: 10px 0 30px 0;
`;

const LeftChoiceAuth = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const LeftChoice = styled.button<{ adminAuth: boolean }>`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 8px 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-bottom: ${props =>
    props.adminAuth ? '2px solid #4BC1A5' : '0px solid #4BC1A5'};
  color: ${props => (props.adminAuth ? '#121212' : '#8F8F8F')};
`;

const LeftFrom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const LeftButton = styled.button`
  width: 100%;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #31b898;
  background: #31b898;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  margin-top: 40px;
`;

const RightSection = styled.section`
  background-color: #1c2632;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 12%;
  text-align: center;
  color: white;
  box-shadow: -10px 2px 30px 0px rgba(0, 0, 0, 0.25);
`;

const RightImage = styled.img`
  width: 452px;
`;

const RightTitle = styled.h2`
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
`;

const RightDescription = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
`;
