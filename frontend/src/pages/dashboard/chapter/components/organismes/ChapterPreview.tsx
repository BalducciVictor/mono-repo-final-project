import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TitleH1 } from '../../../../../components/Title';
import { space } from '../../../../../styles/const';

interface ChapterPreviewProps {
  chapterTitle: string;
  text: string;
}

const ChapterPreview: React.FC<ChapterPreviewProps> = ({
  chapterTitle,
  text,
}) => {
  return (
    <PreviewWrapper>
      <TitleH1 style={{ marginBottom: space.m }}>{chapterTitle}</TitleH1>
      <CustomMarkdown>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </CustomMarkdown>
    </PreviewWrapper>
  );
};

const PreviewWrapper = styled.div`
  flex: 1;
  width: 100%;
  padding: ${space.ml};
  border-radius: 12px;
  background-color: #f8f8f8;
`;

const CustomMarkdown = styled.div`
  line-height: 1.5;
`;

export default ChapterPreview;
