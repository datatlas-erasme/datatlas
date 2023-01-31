import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../store';
import { Rocket, Info, Settings, Play, Clock } from 'kepler.gl/dist/components/common/icons';
import { Link } from 'react-router-dom';
import { logout } from '../../store/reducers/app/user';
import { DatatlasLogo } from '../logos';

const NavContainer = styled.nav`
  grid-area: nav;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  background-color: ${(props) => props.theme.navBackgroundColor};
`;
const NavContainerLogo = styled.div`
  padding: 20px;
  svg {
    padding: 20px;
    :nth-child(2) {
      border-left: 1px solid #cecece;
    }
  }
`;
const NavItemsList = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 20px;
  li {
    align-self: center;
    &:nth-child(1n + 2) {
      padding-left: 10px;
    }
    a,
    button {
      display: flex;
      align-items: center;
      text-decoration: none;
      font-family: ${(props) => props.theme.fontFamily};
      font-size: ${(props) => props.theme.navItemsFontSize};
    }
    button {
      border: none;
      background-color: transparent;
    }
  }
`;
const IconWidth = {
  height: 20,
  width: 20,
};

const Navbar = () => {
  const dispatch = useAppDispatch();

  return (
    <NavContainer>
      <NavContainerLogo>
        <Rocket style={{ height: 35, width: 35, paddingRight: '20px' }} />
        <DatatlasLogo />
      </NavContainerLogo>
      <NavItemsList>
        <li>
          <Link to={'/'}>
            <Info style={{ height: IconWidth.height, width: IconWidth.width, paddingRight: '5px' }} />
            Aide
          </Link>
        </li>
        <li>
          <Link to={'/'}>
            <Settings style={{ height: IconWidth.height, width: IconWidth.width, paddingRight: '5px' }} />
            Réglage
          </Link>
        </li>
        <li>
          <Link to={'/'}>
            <Play style={{ height: IconWidth.height, width: IconWidth.width, paddingRight: '5px' }} />
            Mon Compte
          </Link>
        </li>
        <li>
          <button onClick={() => dispatch(logout())}>
            <Clock style={{ height: 30, width: 30, paddingLeft: '10px' }} />
            Logout
          </button>
        </li>
      </NavItemsList>
    </NavContainer>
  );
};

export default Navbar;
