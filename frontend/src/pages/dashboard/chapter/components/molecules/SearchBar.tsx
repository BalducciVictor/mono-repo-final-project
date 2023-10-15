import styled from "styled-components";
import { SearchIcon } from "../../../../../components/icons/searchIcon";
import { fontSize, color, space } from '../../../../../styles/const';

type InputProps = {
    onChange?: any;
};

export const SearchBar = ({ onChange }: InputProps) => {
    return (
        <WrapperInput>
            <Search>
                <SearchIcon
                    width={20}
                    height={20}
                />
            </Search>
            <Input placeholder="Search..." onChange={(e) => onChange(e.target.value)}/>
        </WrapperInput>
    )
}

const WrapperInput = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Search = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    bottom: 0;
    left: ${space.xs};
    margin: auto;
`

const Input = styled.input`
    width: 348px;   
    font-size: ${fontSize.s};
    padding: ${space.s} ${space.s};
    border-radius: 4px;
    height: 40px;
    padding: 0px ${space.ml};
    border: 1px solid ${color.medium.fontGrey};
`;