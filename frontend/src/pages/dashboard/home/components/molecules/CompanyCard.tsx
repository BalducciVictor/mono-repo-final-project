import styled from "styled-components";
import IllustrationCompany from '../../../../../assets/company.png';

type CompanyCardProps = {
    CompanyName: string;
    HandleDelete: any;
    HandleModifier: any;
    CompanyId: string;
    companyData: any;
};

export const CompanyCard = ({ CompanyName, HandleDelete, HandleModifier, CompanyId, companyData }: CompanyCardProps) => {
    return (
        <Company>
            <img src={IllustrationCompany} alt="" />
            <div>
                <p>{CompanyName}</p>
                <DeleteButton onClick={() => HandleDelete(CompanyId)}>Supprimer</DeleteButton>
                <ModifierButton onClick={() => HandleModifier(companyData)}>Modifier</ModifierButton>
            </div>
        </Company>
    )
}

const Company = styled.li`
    border-radius: 10px;
    background: #FFF;
    box-shadow: 2px 0px 20px 0px rgba(0, 0, 0, 0.10);
    padding: 20px;
    width: 300px;
    display: flex;
    gap: 10px;
    align-items: center;

    img {
        width: 50px
    }

    p {
        color: #121212;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        max-width: 100%;
        margin-bottom: 5px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
`;

const DeleteButton = styled.button`
    background-color: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
    margin-right: 10px;

    &:hover {
        background-color: #e53935;
    }
`;

const ModifierButton = styled.button`
    background-color: #31B898;;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #23866f;;
    }
`;