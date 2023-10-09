import styled from 'styled-components';
import { color, fontSize, space } from '../../../../../styles/const';
import IdeogramImage from '../../../../../assets/ideogram.png';

export const IntroBlock = () => {
  return (
    <IntroBlockStyled>
      <div>
        <IntroBlockTitle>Hello, John !</IntroBlockTitle>
        <IntroBlockText>
          Continue de monter en compétence en autonomie,
          <br /> n’importe où que tu te trouve, grâce à Onby !
        </IntroBlockText>
      </div>
      <IdeogramStyle src={IdeogramImage} alt="ideogram icon" />
    </IntroBlockStyled>
  );
};

const IntroBlockStyled = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${color.light.lightbrandGreen};
  padding: ${space.ml};
  margin-top: ${space.l};
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
  height: 250px;
  width: 250px;
  right: 0;
  top: 0;
  margin-right: 200px;
`;
