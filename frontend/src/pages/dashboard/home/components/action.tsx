import styled from 'styled-components';
import { space } from '../../../../styles/const';

interface ActionButtonProps {
  imageSrc: string;
  text: string;
  onClick?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  imageSrc,
  text,
  onClick,
}) => {
  return (
    <ActionButtonStyled onClick={onClick}>
      <img src={imageSrc} />
      <ButtonText>{text}</ButtonText>
    </ActionButtonStyled>
  );
};

const ButtonText = styled.div`
  margin-left: ${space.s};
`;

const ActionButtonStyled = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  background-color: white;
  max-width: 310px;
  border-radius: 8px;
  padding: ${space.s};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;
