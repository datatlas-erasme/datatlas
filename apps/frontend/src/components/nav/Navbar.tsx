import React, { ReactNode } from 'react';
import styled from 'styled-components';

type NavbarProps = {
  children: ReactNode;
};

const NavStyle = styled.nav`
  grid-area: nav;
  padding: 20px;
  height: 5vh;
  background-color: ${(props) => props.theme.navBackgroundColor};
`;

const Navbar = (NavbarProps) => <NavStyle>Je suis la Navigation</NavStyle>;

export default Navbar;
