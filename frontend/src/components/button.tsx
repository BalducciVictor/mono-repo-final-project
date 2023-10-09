import styled, { css } from 'styled-components';
import { ReactNode, ButtonHTMLAttributes } from 'react';
import { color } from '../styles/const';

const buttonColors = {
  default: {
    background: color.medium.mainGreen,
    color: 'white',
  },
  highlighted: {
    background: 'none',
    color: color.medium.mainGreen,
  },
};

interface ButtonStyledProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'highlighted';
}

export const Button = ({
  children,
  variant = 'default',
}: {
  children: ReactNode;
  variant?: 'default' | 'highlighted';
}) => {
  return <ButtonStyled variant={variant}>{children}</ButtonStyled>;
};

const ButtonStyled = styled.button<ButtonStyledProps>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  ${props =>
    props.variant === 'default'
      ? css`
          background: ${buttonColors.default.background};
          color: ${buttonColors.default.color};
        `
      : css`
          background: ${buttonColors.highlighted.background};
          border: 1px solid ${buttonColors.highlighted.color};
          color: ${buttonColors.highlighted.color};
        `};
`;
