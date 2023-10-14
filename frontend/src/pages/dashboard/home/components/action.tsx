import styled from "styled-components";

interface ActionButtonProps {
    imageSrc: string;
    text: string;
    onClick?: () => void;
}
  
export const ActionButton: React.FC<ActionButtonProps> = ({ imageSrc, text, onClick }) => {
    return (
        <ButtonContainer onClick={onClick}>
            <img src={imageSrc} alt={text} />
            <p>{text}</p>
        </ButtonContainer>
    );
};

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    padding: 10px 20px;
    margin: 0px 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    img {
        max-height: 80px;
        margin-bottom: 10px;
    }

    p {
        font-size: 16px;
        text-align: center;
        color: #333;
        margin-left: 10px;
        font-weight: bold;
    }

    &:hover {
        box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
        transition: all 0.3s ease-in-out;
    }
`;
  