import styled from 'styled-components';
import { useState } from 'react';
import { FormularInput } from '../molecules/FormularInput';
import ProfileImage from "../../../../../assets/profilImage.png";

type ProfileCadreProps = {
    id?: string | null,
    email?: any,
    firstName?: string | null,
    lastName?: string | null,
    companyName?: string,
    setEmail: any,
    setPassword: any,
    password: any,
    handleLogin: any,
};

export const ProfileCadre = ({id, companyName, email, firstName, lastName, setEmail, setPassword, password, handleLogin}: ProfileCadreProps) => {

    return (
        <ProfileCadreWrapper>
            <HeaderProfile>
                <img src={ProfileImage} alt=""/>
                <ProfileDescription>
                    <ProfileName>{firstName} {lastName}</ProfileName>
                    <p><ProfilLabel>Indentification:</ProfilLabel> {id}</p>
                    <p><ProfilLabel>Entreprise:</ProfilLabel> {companyName}</p>
                </ProfileDescription>
            </HeaderProfile>
            <FormularInput
                label={"Email :"}
                placeholder={email}
                type={"mail"}
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
            />
            <FormularInput
                label={"Nouveau Mot de passe :"}
                placeholder={"Min. 8 characters"}
                type={"password"}
                value={password}
                onChange={setPassword}
            />
            <FormularInput
                label={"Confirmez le nouveau Mot de passe :"}
                placeholder={"Min. 8 characters"}
                type={"password"}
                value={password}
                onChange={(e: any) => setEmail(e.target.value)}
            />
            <ModifButton onClick={handleLogin}>Valide mes modifications</ModifButton>
        </ProfileCadreWrapper>
    );
};


const ProfileCadreWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-self: center;
    border-left: 5px solid #31B898;
    padding: 30px 80px;
    width: 60%;
    height: 485px;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 2px 0px 20px 0px rgba(0, 0, 0, 0.10);
`;

const HeaderProfile = styled.div`
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 20px;
`;

const ProfileDescription = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const ProfileName = styled.p`
    color: #0D2E47;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
`

const ProfilLabel = styled.span`
    color: #31B898;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
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
