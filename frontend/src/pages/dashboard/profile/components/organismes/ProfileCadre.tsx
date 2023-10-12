import styled from 'styled-components';
import { useState } from 'react';

export const ProfileCadre = () => {
    return (
        <ProfileCadreWrapper>
            <p>profile</p>
        </ProfileCadreWrapper>
    );
};

const ProfileCadreWrapper = styled.div`
    align-self: center;
    border-left: 5px solid #31B898;
    padding: 30px 80px;
    width: 567px;
    height: 485px;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 2px 0px 20px 0px rgba(0, 0, 0, 0.10);
`;