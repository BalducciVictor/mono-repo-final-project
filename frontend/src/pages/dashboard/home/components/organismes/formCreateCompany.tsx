import { useEffect, useState } from "react";
import { FormularInput } from '../molecules/FormularInput';
import styled from "styled-components";


type CreateCompanyProps = {
    companyName: string,
    setCompanyName: any,
    handleSubmit: any,
};

export const CreateCompanyForm = ({companyName, setCompanyName, handleSubmit}: CreateCompanyProps) => {
    return (
        <WrapperForm>
            <h1>Ajouter une entreprise</h1>
            <form onSubmit={handleSubmit}>
                <FormularInput
                    label={"Nom de L'entreprise"}
                    placeholder={companyName}
                    type={"Wayne entreprise"}
                    value={companyName}
                    onChange={(e: any) => setCompanyName(e.target.value)}
                />
                <ModifButton type="submit">Créer la company</ModifButton>
            </form>
        </WrapperForm>
    );
}

const WrapperForm = styled.div` 
    padding: 20px;
    width: 500px;
`

const ModifButton = styled.button`
    width: 100%;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #31b898;
    background: #31b898;
    color: #fff;
    font-size: 16px;
    font-style: normal;
    margin-top: 20px;
`;
