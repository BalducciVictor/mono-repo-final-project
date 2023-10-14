import React, { useState } from 'react';
import styled from 'styled-components';
import { Documentations } from '../../../../../types/coursesTypes';
import { color, space } from '../../../../../styles/const';

interface ChapterRectanglesProps {
  documentations: Documentations[];
  handleAddChapter?: () => void;
  isCreation?: boolean;
  setCurrentStep?: (step: number) => void;
  currentStep?: number;
}

export const ChapterRectangles: React.FC<ChapterRectanglesProps> = ({
  documentations,
  handleAddChapter,
  isCreation,
  setCurrentStep,
  currentStep,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  return (
    <RectanglesWrapper>
      {documentations.map((documentation, index) => (
        <div key={index} style={{ position: 'relative' }}>
          <Rectangle
            onClick={() => setCurrentStep && setCurrentStep(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
            currentStep={currentStep}
            index={index}
          />

          {hoveredIndex === index && (
            <TitleOverlay>
              {documentation.title.length > 8
                ? documentation.title.slice(0, 8) + '...'
                : documentation.title}
            </TitleOverlay>
          )}
        </div>
      ))}
      {isCreation && (
        <>
          <ChapterInProgress />
          <PlusRectangle onClick={handleAddChapter}>+</PlusRectangle>
        </>
      )}
    </RectanglesWrapper>
  );
};

const RectanglesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${space.m} 0;
  flex-wrap: wrap;
`;

const Rectangle = styled.div<{ currentStep?: number; index?: number }>`
  width: 100px;
  height: 20px;
  background-color: ${({ currentStep, index }) =>
    currentStep === index
      ? color.light.lightbrandGreen
      : color.medium.mainGreen};
  margin-right: ${space.xxs};
  border-radius: 4px;
  margin-bottom: ${space.xs};
`;
const ChapterInProgress = styled.div`
  width: 100px;
  height: 20px;
  background-color: ${color.light.lightbrandGreen};
  margin-right: ${space.xxs};
  margin-bottom: ${space.xs};
  border-radius: 4px;
`;

const PlusRectangle = styled.div`
  width: 100px;
  height: 20px;
  background-color: #ccc;
  margin-right: 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: ${space.xs};
`;

const TitleOverlay = styled.div`
  position: absolute;
  top: -25px;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 5px;
  border-radius: 4px;
`;
