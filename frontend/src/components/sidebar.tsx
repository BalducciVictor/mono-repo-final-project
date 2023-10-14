import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { StudentCapIcon } from './icons/studentCapIcon';
import { color, iconSize, space } from '../styles/const';
import { HomeIcon } from './icons/homeIcon';
import { BrandIcon } from './icons/brandIcon';
import { ProfileIcon } from './icons/profileIcon';
import { ExitIcon } from './icons/exitIcon';
import { useUser } from '../userContext';
import sessionAPI from '../services/sessionStorageAPI';

export const SignOut = () => {
  const {user, setUser} = useUser();
  const navigate = useNavigate();

  const handleClick = () => {
    setUser({role: null, id: null, companyId: null, currentChapterId: null, currentChapterStepId: null, email:null, firstName: null, lastName: null, validatedChapterId: null, refreshToken: null});
    sessionAPI.removeToken()
    sessionAPI.removeUser()
    navigate('/')
  }

  return (
    <SignOutContainer onClick={handleClick}>
      <ExitIcon size={iconSize.m} color={color.light.PureWhite} />
      <Text>
        Sign out
      </Text>
    </SignOutContainer>
  )
}

export const Sidebar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const {user, setUser} = useUser();

  return (
    <SidebarContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TopSideBar>
        <BrandIcon size={iconSize.xl} color={color.light.brandGreen} />
      </TopSideBar>
      <MiddleSideBar>
        <SidebarItem>
          <SidebarLink to="">
            <HomeIcon size={iconSize.m} color={color.light.PureWhite} />
            <Text className={isHovered ? 'show-text' : 'hide-text'}>Home</Text>
          </SidebarLink>
        </SidebarItem>
        <SidebarItem>
          <SidebarLink to="chapters">
            <StudentCapIcon size={iconSize.m} color={color.light.PureWhite} />
            <Text className={isHovered ? 'show-text' : 'hide-text'}>
              Chapters
            </Text>
          </SidebarLink>
        </SidebarItem>
        <SidebarItem>
          <SidebarLink to="profile">
            <ProfileIcon size={iconSize.m} color={color.light.PureWhite} />
            <Text className={isHovered ? 'show-text' : 'hide-text'}>
              {user.firstName}
            </Text>
          </SidebarLink>
        </SidebarItem>
        <SidebarItem>
          <SignOut/>
        </SidebarItem>
      </MiddleSideBar>
    </SidebarContainer>
  );
};

const TopSideBar = styled.div`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const MiddleSideBar = styled.div`
  width: 100%;
  display: flex;
  margin-left: 5px;
  flex-direction: column;
`;

const Text = styled.p`
  margin: 0;
  margin-left: ${space.xs};
  transition: opacity 0.3s ease;
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 180px;
  height: 100%;
  background-color: ${color.darker.brandBlue};
  color: #fff;
  padding: 20px;
  transition: width 0.3s ease;
`;

const SidebarItem = styled.div`
  border-radius: 10px;
  padding: ${space.m} ${space.s};
  cursor: pointer;
  &:hover{
    background-color: #273445;;
  }
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
`;

const SignOutContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
