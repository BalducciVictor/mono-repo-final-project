import styled from 'styled-components';
import { useState } from 'react';
import { IntroBlock } from './components/molecules/introBlock';
import { ProfileCadre } from './components/organismes/ProfileCadre';
import { fontSize, color, space } from '../../../styles/const';

export const Profile = () => {
  return (
    <ProfileWrapper>
      <Title>Mes Infos Personnelle</Title>
      <IntroBlock/>
      <ProfileCadre/>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Title = styled.h1`
  color: ${color.darker.fontDark};
  font-size: ${fontSize.xl};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: ${space.ml};
`
