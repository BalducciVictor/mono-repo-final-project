import styled from 'styled-components';
import IllustrationCompany from '../../../../../assets/company.png';
import { color, space } from '../../../../../styles/const';

type CompanyCardProps = {
  CompanyName: string;
  HandleDelete: any;
  HandleModifier: any;
  CompanyId: string;
  companyData: any;
};

export const CompanyCard = ({
  CompanyName,
  HandleDelete,
  HandleModifier,
  CompanyId,
  companyData,
}: CompanyCardProps) => {
  return (
    <Company>
      <img src={IllustrationCompany} alt="" />
      <div>
        <p>{CompanyName}</p>
        <ModifierButton onClick={() => HandleModifier(companyData)}>
          Modifier
        </ModifierButton>
        <DeleteButton onClick={() => HandleDelete(CompanyId)}>
          Supprimer
        </DeleteButton>
      </div>
    </Company>
  );
};

const Company = styled.li`
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 300px;
  display: flex;
  gap: 10px;
  align-items: center;

  img {
    width: 50px;
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
  background-color: ${color.error.lightError};
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${color.error.lightError};
  }
`;

const ModifierButton = styled.button`
  background-color: #31b898;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: ${space.xs};
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #23866f;
  }
`;
