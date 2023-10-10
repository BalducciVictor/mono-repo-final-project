import React from "react";
import styled from "styled-components";
import { Button } from "./button";

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ContainerModal>
      <Modal>
        <Button onClick={onClose}>Close</Button>
        {children}
      </Modal>
    </ContainerModal>
  );
};

const ContainerModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;
