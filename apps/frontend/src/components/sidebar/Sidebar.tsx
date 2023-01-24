import React, { ReactNode } from 'react';
import styled from 'styled-components';

type SidebarProps = {
  children: ReactNode;
};

const SideBarContainer = styled.aside`
  grid-area: aside;
  padding: ${(props) => props.theme.layoutsBoxContainer};
`;

const Sidebar = (SidebarProps) => <SideBarContainer>Je suis la SideBar</SideBarContainer>;

export default Sidebar;
