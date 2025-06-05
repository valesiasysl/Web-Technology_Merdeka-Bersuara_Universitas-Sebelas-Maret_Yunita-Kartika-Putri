import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaGavel, FaFileAlt, FaCommentDots } from 'react-icons/fa';
import styled from 'styled-components';

// Styling untuk Sidebar
const SidebarContainer = styled.div`
  height: 100vh;
  width: 250px;
  background-color: #8b0000; /* Merah tua */
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

// Styling untuk judul sidebar
const SidebarTitle = styled.h2`
  color: white;
  font-size: 1.5em;
  padding: 0 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

// Styling untuk item sidebar
const SidebarItem = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  margin: 5px 0;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-size: 16px;

  &:hover {
    background-color: #a60000; /* Efek hover */
    color: #fff;
  }

  svg {
    margin-right: 10px;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarTitle>Menu</SidebarTitle>
      
      {/* Sidebar Links */}
      <SidebarItem to="/admin">
        <FaHome /> Beranda
      </SidebarItem>

      <SidebarItem to="/users">
        <FaUsers /> Pengguna
      </SidebarItem>

      <SidebarItem to="/admin/advokats">
        <FaGavel /> Advokat
      </SidebarItem>

      <SidebarItem to="/admin/laporan">
        <FaFileAlt /> Laporan
      </SidebarItem>

      {/* Artikel Link */}
      <SidebarItem to="/admin/artikel">
        <FaFileAlt /> Artikel
      </SidebarItem>

      {/* Chat Bot Link */}
      <SidebarItem to="/admin/chatbot">
        <FaCommentDots /> Chat Bot
      </SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
