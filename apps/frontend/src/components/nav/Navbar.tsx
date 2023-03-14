import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch } from '../../store';
import { logout } from '../../store/reducers/user';
import { RootState } from '../../store/reducers';
import { selectProjectById } from '../../store/selectors';
import { ProjectInterface } from '@datatlas/models';
import { DatatlasLogo, HomeIcon } from '../logos';
import { StyledBadgeOutline } from '../badges';
import { Clock } from 'kepler.gl/dist/components/common/icons';
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
      border-right: 1px solid ${({ theme }) => theme.greyMedium};
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
const BadgesItem = styled(StyledBadgeOutline)`
  text-align: center;
  margin-right: 5px;
  svg {
    margin: auto;
    height: 10px;
    width: auto;
    padding-right: 0;
  }
`;
const ProjectButton = styled.button`
  font-size: 24px;
  font-weight: 400;
`;

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const project = useSelector<RootState, ProjectInterface | null>((state) => selectProjectById(state, id));

  return (
    <NavContainer>
      <NavContainerLogo>
        <Link to={'/'}>
          <HomeIcon />
        </Link>
        <DatatlasLogo />
      </NavContainerLogo>
      {project && <ProjectButton>{project.title}</ProjectButton>}
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
