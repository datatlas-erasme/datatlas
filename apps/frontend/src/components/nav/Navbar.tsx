import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../store';
import { Rocket, Info, Settings, Play, Clock } from 'kepler.gl/dist/components/common/icons';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { logout } from '../../store/reducers/user';
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
  font-family: ${(props) => props.theme.fontFamily};
  li {
    align-self: center;
    &:nth-child(1n + 2) {
      padding-left: 10px;
    }
    a,
    button {
      display: flex;
      align-items: center;
      font-family: ${(props) => props.theme.fontFamily};
      font-size: ${(props) => props.theme.navItemsFontSize};
    }
    button {
      border: none;
      background-color: transparent;
    }
  }
`;
const NavItem = styled(Link)`
  text-decoration: none;
  svg {
    height: 20px;
    width: 20px;
    padding-right: 5px;
  }
`;

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
          <NavItem to={'/'}>
            <Info />
            <FormattedMessage defaultMessage={'Aide'} />
          </NavItem>
        </li>
        <li>
          <NavItem to={'/'}>
            <Settings />
            <FormattedMessage defaultMessage={'Réglages'} />
          </NavItem>
        </li>
        <li>
          <NavItem to={'/'}>
            <Play />
            <FormattedMessage defaultMessage={'Mon Compte'} />
          </NavItem>
        </li>
        <li>
          <button onClick={() => dispatch(logout())}>
            <Clock style={{ height: 30, width: 30, paddingLeft: '10px' }} />
            <FormattedMessage defaultMessage={'Logout'} />
          </button>
        </li>
      </NavItemsList>
    </NavContainer>
  );
};

export default Navbar;
