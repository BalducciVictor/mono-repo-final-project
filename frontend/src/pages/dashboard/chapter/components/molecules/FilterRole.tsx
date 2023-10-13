import styled from "styled-components";
import { fontSize, color, space } from '../../../../../styles/const';

interface FilterRoleProps {
    categories?: {
        _id: string,
        name: string,
    }[],
    onChange?: any,
};

export const FilterRole = ({categories, onChange}: FilterRoleProps) => {
    return (
        <WrapperFilter>
            <FilterLabel>Filtrer par</FilterLabel>
            <FilterDisplay
                onChange={(e) => onChange(e.target.value)}
            >
            <option value="">Toutes les catégories</option>
            {categories && categories.map((category: any) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
            ))}
        </FilterDisplay>
        </WrapperFilter>
    )
}

const WrapperFilter = styled.div`
    display: flex;
    justify-content: end;
`;

const FilterLabel = styled.p`
    border-radius: 4px 0px 0px 4px;
    background: #D0F9F0;
    padding: ${space.s} ${space.xs};
    font-size:  ${fontSize.s};
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FilterDisplay = styled.select`
    padding: ${space.xs} ${space.s};
    border-radius: 0px 4px 4px 0px;
    border: 1px solid ${color.light.WhiteSmoke};
`;
