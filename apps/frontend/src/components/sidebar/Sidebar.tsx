import React, { ReactNode } from 'react';

type SidebarProps = {
  children: ReactNode;
};
const Sidebar = (SidebarProps) => <aside style={{ gridArea: 'aside' }}>Je suis la SideBar</aside>;

export default Sidebar;
