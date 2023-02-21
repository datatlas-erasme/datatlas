import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch } from '../../store';
import { logout } from '../../store/reducers/user';
import { Clock } from 'kepler.gl/dist/components/common/icons';
import { DatatlasLogo, HomeIcon } from '../logos';
import { themeColor, BadgeOutlines } from '../../style/theme';
import { HelpIcon, WheelIcon } from '../icon';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  background-color: ${(props) => props.theme.navBackgroundColor};
`;
const NavContainerLogo = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 100px;
    :nth-child(1) {
      border-right: 1px solid ${themeColor.greyMedium};
    }
    :nth-child(2) {
      margin: 0 20px;
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
const BadgesItem = styled(BadgeOutlines)`
  text-align: center;
  margin-right: 5px;
  svg {
    margin: auto;
    height: 10px;
    width: auto;
    padding-right: 0;
  }
`;

const Navbar = () => {
  const dispatch = useAppDispatch();

  return (
    <NavContainer>
      <NavContainerLogo>
        <Link to={'/'}>
          <HomeIcon />
        </Link>
        <DatatlasLogo />
      </NavContainerLogo>
      <NavItemsList>
        <li>
          <NavItem to={'/'}>
            <BadgesItem>
              <HelpIcon />
            </BadgesItem>
            <FormattedMessage defaultMessage={'Aide'} />
          </NavItem>
        </li>
        <li>
          <NavItem to={'/'}>
            <BadgesItem>
              <WheelIcon />
            </BadgesItem>
            <FormattedMessage defaultMessage={'Réglages'} />
          </NavItem>
        </li>
        <li>
          <NavItem to={'/'}>
            <BadgesItem>{'A'}</BadgesItem>
            <FormattedMessage defaultMessage={'Mon Compte'} />
          </NavItem>
        </li>
        <li>
          <button onClick={() => dispatch(logout())}>
            <BadgesItem>
              <Clock />
            </BadgesItem>
            <FormattedMessage defaultMessage={'Logout'} />
          </button>
        </li>
      </NavItemsList>
    </NavContainer>
  );
};

export default Navbar;
