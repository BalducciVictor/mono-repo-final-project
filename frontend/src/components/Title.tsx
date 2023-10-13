import styled from 'styled-components';
import { ReactNode } from 'react';
import { fontSize } from '../styles/const';

export const TitleH1 = ({ children }: { children: ReactNode }) => {
  return <TitleH1Styled>{children}</TitleH1Styled>;
};

const TitleH1Styled = styled.h1`
  font-size: ${fontSize.xl};
  font-weight: 600;
`;

export const TitleH2 = ({ children }: { children: ReactNode }) => {
  return <TitleH2Styled>{children}</TitleH2Styled>;
};

const TitleH2Styled = styled.h2`
  font-size: ${fontSize.l};
  font-weight: 600;
`;
