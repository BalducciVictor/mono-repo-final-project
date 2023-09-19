import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar';
import { Home } from './home';
import { Chapter } from './chapter';
import { Profile } from './profile';

export const Dashboard = () => {
  return (
    <DashboardContainer>
      <Sidebar />
      <Content>
        <Routes>
          <Route path="dashboard" element={<Home />} />
          <Route path="chapters" element={<Chapter />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Content>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0;
  overflow-y: auto;
`;
