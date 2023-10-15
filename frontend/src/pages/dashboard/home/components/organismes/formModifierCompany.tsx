import { useEffect, useState } from "react";
import { FormularInput } from '../molecules/FormularInput';
import styled from "styled-components";
import { putGroupeInCompany } from "../../../../../services/api";


type ModifierCompanyProps = {
    companyGroupe: any,
    updatedCompany: any,
};

export const ModifierCompanyForm = ({companyGroupe, updatedCompany}: ModifierCompanyProps) => {
    const [groupe, setGroupe] = useState('');

    const addGroupe = async () => {
        try {
            const update = await putGroupeInCompany(companyGroupe._id, groupe);
            updatedCompany(update);
        } catch(e: any) {
            console.log(e);
        }
    }

    return (
        <WrapperForm>
            <h1>Modifier une company</h1>
            <FormularInput
                label={"Nom de L'entreprise"}
                placeholder={"Designer"}
                type={"text"}
                value={groupe}
                onChange={(e: any) => setGroupe(e.target.value)}
            />
            <h2>Liste des groupes de l'entreprises:</h2>
            <ul>
                {
                    companyGroupe && companyGroupe.companyGroup.map((value: any) => {
                        return (
                            <GroupeItem>{value.groupName}</GroupeItem>
                            );
                        })
                    }
            </ul>
            <ModifButton onClick={() => addGroupe()}>Ajouter le groupe</ModifButton>
        </WrapperForm>
    );
}

const WrapperForm = styled.div` 
    padding: 20px;
    width: 500px;

    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    h2 {
        font-size: 18px;
        margin: 20px 0 10px;
    }
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

const GroupeItem = styled.li`
    margin-top: 5px;
    border: 1px solid #31b898;
    padding: 10px;
    border-radius: 4px;
`;
