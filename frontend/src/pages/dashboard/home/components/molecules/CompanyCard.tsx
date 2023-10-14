import styled from "styled-components";

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
            <p>{CompanyName}</p>
            <button onClick={() => HandleDelete(CompanyId)}>Supprimer</button>
            <button onClick={() => HandleModifier(companyData)}>Modifier</button>
        </Company>
    )
}

const Company = styled.li`
    border-radius: 10px;
    background: #FFF;
    box-shadow: 2px 0px 20px 0px rgba(0, 0, 0, 0.10);
    padding: 20px;
    width: 300px;
`;
