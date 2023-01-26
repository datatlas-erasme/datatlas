import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface NavbarInterface {
  children: ReactNode;
}

const NavStyle = styled.nav`
  grid-area: nav;
  padding: 20px;
  height: 5vh;
  background-color: ${(props) => props.theme.navBackgroundColor};
`;

const Navbar = ({ children }: NavbarInterface) => <NavStyle>Je suis la Navigation</NavStyle>;

export default Navbar;
