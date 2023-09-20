import styled from "styled-components";

type InputProps = {
    label: string;
    type: string;
    placeholder: string;
};

export const FormularInput = ({ label, type, placeholder }: InputProps) => {
    return (
        <WrapperInput>
            <LabelText>{ label }</LabelText>
            <Input type={type} placeholder={placeholder}/>
        </WrapperInput>
    )
}

const WrapperInput = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
`;

const LabelText = styled.label`
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const Input = styled.input`
    width: 348px;   
    padding: 12px 16px;
    border-radius: 4px;
    border: 1px solid #31B898;
`;
