import React from 'react';
import styled from 'styled-components';
import { Button } from '../../../../components/atoms/button';
import { TitleH2 } from '../../../../components/Title';
import { space } from '../../../../styles/const';

export const HeadSection = ({
  title,
  buttonTitle,
  onClick,
}: {
  title: string;
  buttonTitle?: string;
  onClick?: () => void;
}) => {
  return (
    <HeadSectionStyled>
      <TitleH2>{title}</TitleH2>
      {buttonTitle && (
        <Button variant="highlighted" onClick={onClick}>
          {buttonTitle}
        </Button>
      )}
    </HeadSectionStyled>
  );
};

const HeadSectionStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${space.m} 0;
`;
