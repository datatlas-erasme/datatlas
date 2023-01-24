import React, { ReactNode } from 'react';

type NavbarProps = {
  children: ReactNode;
};

const Navbar = (NavbarProps) => <nav style={{ gridArea: 'nav' }}>Je suis la Navigation</nav>;

export default Navbar;
