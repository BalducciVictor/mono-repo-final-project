import React from 'react';
import styled from 'styled-components';
import { color, fontSize, space } from '../../../../styles/const';
import chapterImage from '../../../../assets/chapterImage.png';

interface ProgressCardProps {
  name: string;
  category: string;
  progress: number;
}

export const ProgressChapterCard: React.FC<ProgressCardProps> = ({
  name,
  category,
  progress,
}) => {
  return (
    <CardContainer>
      <CardHeader>
        <ChapterImage src={chapterImage} alt="Chapter" />
        <TextContent>
          <Title>{name}</Title>
          <Description>{category}</Description>
        </TextContent>
      </CardHeader>
      <ProgressBarAndPercentage>
        <ProgressBarContainer>
          <ProgressBarFill progress={progress} />
        </ProgressBarContainer>
        <Percentage>{`${progress}%`}</Percentage>
      </ProgressBarAndPercentage>
    </CardContainer>
  );
};

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${space.s};
`;

const ChapterImage = styled.img`
  max-width: 50px;
  max-height: 50px;
`;

const CardContainer = styled.div`
  background-color: white;
  min-width: 420px;
  padding: ${space.ml};
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${space.s};
`;

const Title = styled.h2`
  font-size: ${fontSize.m};
  margin-bottom: ${space.xxs};
  font-weight: bold;
`;

const Percentage = styled.span`
  font-size: ${fontSize.m};
  font-weight: 600;
  margin-left: ${space.s};
  color: ${color.medium.mainGreen};
`;

const Description = styled.p`
  font-size: ${fontSize.m};
`;

const ProgressBarAndPercentage = styled.div`
  display: flex;
  align-items: center;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 8px;
  background-color: ${color.light.lightGrey};
  border-radius: 4px;
`;

const ProgressBarFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: ${color.medium.mainGreen};
  border-radius: 4px;
`;
