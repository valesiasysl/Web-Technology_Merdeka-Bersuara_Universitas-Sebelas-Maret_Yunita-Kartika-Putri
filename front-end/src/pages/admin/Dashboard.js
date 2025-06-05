import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  background-color: #f4f4f4;
  padding: 20px;
  margin-left: 250px; /* Menyesuaikan dengan lebar sidebar */
`;

const Title = styled.h1`
  color: #333;
  font-size: 30px;
  margin-bottom: 20px;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Sidebar />
      <MainContent>
        <Header />
        <Title>Welcome to Admin Dashboard</Title>
        <p>Manage your content here</p>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
