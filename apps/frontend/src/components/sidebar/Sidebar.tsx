import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface SideBarInterface {
  children: ReactNode;
}

const SideBarContainer = styled.aside`
  grid-area: aside;
  padding: ${(props) => props.theme.layoutsBoxContainer};
`;

const Sidebar = ({ children }: SideBarInterface) => (
  <SideBarContainer>
    <h3>Je suis la SideBar</h3>
    {children}
  </SideBarContainer>
);

export default Sidebar;
