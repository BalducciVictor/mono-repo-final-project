import React, { useRef } from 'react';
import styled from 'styled-components';
import { ImageIcon } from '../../assets/icons/imageIcon';
import { color, space } from '../../styles/const';

const ImagePickerWrapper = styled.label`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid ${color.medium.mainGreen};
  padding: ${space.xs};
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Text = styled.div`
  font-size: 16px;
  margin-left: ${space.xs};
  color: black;
`;

export const ImagePicker = ({
  onImageSelected,
}: {
  onImageSelected: (selectedFile: string) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImagePick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    // onImageSelected(selectedFile);
  };

  return (
    <div>
      <HiddenInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />
      <ImagePickerWrapper onClick={handleImagePick}>
        <ImageIcon color={'black'} size={20} />
        <Text>Ajouter une image</Text>
      </ImagePickerWrapper>
    </div>
  );
};
