import React from 'react';
import styled from 'styled-components';
import { Button } from '../../../../components/atoms/button';
import { TitleH2 } from '../../../../components/Title';
import { space } from '../../../../styles/const';

export const HeadSection = ({ title }: { title: string }) => {
  return (
    <HeadSectionStyled>
      <TitleH2>{title}</TitleH2>
      <Button variant="highlighted">Voir plus</Button>
    </HeadSectionStyled>
  );
};

const HeadSectionStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${space.l} 0 0 0;
`;
