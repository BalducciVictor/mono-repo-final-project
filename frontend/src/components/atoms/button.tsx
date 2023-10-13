import styled, { css } from 'styled-components';
import { ReactNode, ButtonHTMLAttributes, CSSProperties } from 'react';
import { color } from '../../styles/const';

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
  buttonStyle?: CSSProperties;
}

export const Button: React.FC<ButtonStyledProps> = ({
  children,
  variant = 'default',
  buttonStyle,
  ...props
}) => {
  return (
    <ButtonStyled variant={variant} style={buttonStyle} {...props}>
      {children}
    </ButtonStyled>
  );
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
