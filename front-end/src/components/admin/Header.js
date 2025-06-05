import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h2`
  color: #333;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>Admin Panel</HeaderTitle>
      <div>
        {/* Additional Header Content (e.g. User profile, logout button) */}
      </div>
    </HeaderContainer>
  );
};

export default Header;
