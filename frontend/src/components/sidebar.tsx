import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StudentCapIcon } from './icons/studentCapIcon';
import { color, iconSize, space } from '../styles/const';
import { HomeIcon } from './icons/homeIcon';
import { BrandIcon } from './icons/brandIcon';
import { ProfileIcon } from './icons/profileIcon';
import { RightArrow } from './icons/arrowIcons';
import { ExitIcon } from './icons/exitIcon';

export const Sidebar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

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
          <SidebarLink to="dashboard">
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
              Hugues
            </Text>
          </SidebarLink>
        </SidebarItem>
      </MiddleSideBar>
    </SidebarContainer>
  );
};

const TopSideBar = styled.div`
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
  &.hide-text {
    display: none;
  }
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 40px;
  height: 100%;
  background-color: ${color.darker.brandBlue};
  color: #fff;
  padding: 20px;
  transition: width 0.3s ease;

  &:hover {
    width: 136px;
  }
`;

const SidebarItem = styled.div`
  margin: ${space.m} 0;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
`;
