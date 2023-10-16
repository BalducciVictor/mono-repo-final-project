import styled from 'styled-components';
import { color, fontSize, space } from '../../../../../styles/const';
import IdeogramImage from '../../../../../assets/ideogram.png';
import { useUser } from '../../../../../userContext';

export const IntroBlock = () => {
  const { user, setUser } = useUser();
  return (
    <IntroBlockStyled>
      <div>
        <IntroBlockTitle>Hello, {user.firstName} !</IntroBlockTitle>
        <IntroBlockText>
          Continue de monter en compétence en autonomie,
          <br /> n’importe où que tu te trouve, grâce à Onby !
        </IntroBlockText>
        <IdeogramStyle src={IdeogramImage} alt="ideogram icon" />
      </div>
    </IntroBlockStyled>
  );
};

const IntroBlockStyled = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  background-color: ${color.light.lightbrandGreen};
  padding: ${space.ml};
  margin-top: ${space.s};
  width: 100%;
  border-radius: ${space.xs};
`;

const IntroBlockTitle = styled.p`
  font-size: ${fontSize.l};
  font-weight: bold;
  margin-bottom: ${space.xs};
`;

const IntroBlockText = styled.p`
  font-size: ${fontSize.m};
`;

const IdeogramStyle = styled.img`
  position: absolute;
  top: 0px;
  height: 200px;
  width: 200px;
  right: 0;
  top: -50px;
  margin-right: 200px;
`;
