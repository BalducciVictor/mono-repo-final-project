import styled from 'styled-components';
import { ReactNode, CSSProperties } from 'react';
import { fontSize } from '../styles/const';

interface TitleProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const TitleH1 = ({ children, style }: TitleProps) => {
  return <TitleH1Styled style={style}>{children}</TitleH1Styled>;
};

const TitleH1Styled = styled.h1`
  font-size: ${fontSize.xl};
  font-weight: 600;
`;

export const TitleH2 = ({ children, style }: TitleProps) => {
  return <TitleH2Styled style={style}>{children}</TitleH2Styled>;
};

const TitleH2Styled = styled.h2`
  font-size: ${fontSize.l};
  font-weight: 600;
`;
