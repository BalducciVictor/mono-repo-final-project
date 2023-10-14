import { useEffect, useState } from "react";
import { FormularInput } from '../molecules/FormularInput';
import styled from "styled-components";


type ModifierCompanyProps = {
    companyGroupe: any,
};

export const ModifierCompanyForm = ({companyGroupe}: ModifierCompanyProps) => {
    return (
        <WrapperForm>
            <h1>Modifier une company</h1>
            <form>
                <ul>
                    {
                        companyGroupe && companyGroupe.companyGroup.map((value: any) => {
                            return (
                                <li>{value.groupName}</li>
                            );
                        })
                    }
                </ul>
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