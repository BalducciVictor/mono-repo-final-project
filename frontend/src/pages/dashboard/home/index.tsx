import styled from 'styled-components';
import { TitleH1 } from '../../../components/Title';
import { IntroBlock } from './components/sections/introBlock';
import { CurrentChapters } from './components/sections/currentChapters';

export const Home = () => {
  return (
    <HomeContainer>
      <TitleH1>Dashboard</TitleH1>
      <IntroBlock />
      <CurrentChapters />
    </HomeContainer>
  );
};

const HomeContainer = styled.div``;
