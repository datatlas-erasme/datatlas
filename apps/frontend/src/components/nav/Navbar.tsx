import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Clock } from 'kepler.gl/dist/components/common/icons';
import { useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { StyledBadgeOutline } from '../badges';
import { AccountIcon, EditorsIcon, HelpIcon, WheelIcon } from '../icon';
import { DatatlasLogo, HomeIcon } from '../logos';
import { useAppDispatch } from '../../store';
import { logout } from '../../store/reducers/user';
import { useGetProjectQuery } from '../../store/api';
import { selectLoggedIn } from '../../store/selectors';
import { useFetchUser } from '../../hooks/useFetchUser';
import { Project } from '@datatlas/models';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.navBackgroundColor};
`;
const NavContainerLogo = styled.div`
  display: flex;
  align-items: center;

  ${DatatlasLogo} {
    height: 38px;
    margin: 0 19px;
  }
`;
const NavItemsList = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 18px;
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
    button:disabled {
      cursor: default;
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

const HomeLink = styled(Link)`
  padding: 19px;
  border-right: 1px solid ${({ theme }) => theme.greyMedium};
  svg {
    width: 19px;
  }
`;

interface NavbarProps {
  helpButtonEnabled?: boolean;
  settingsButtonEnabled?: boolean;
  handleClickContributors: () => void;
}

const Navbar = ({ helpButtonEnabled = false, settingsButtonEnabled = false, handleClickContributors }: NavbarProps) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { data } = useGetProjectQuery(id ?? skipToken);
  const { data: user } = useFetchUser();
  const loggedIn = useSelector(selectLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <NavContainer>
      <NavContainerLogo>
        <HomeLink to={'/'}>
          <HomeIcon />
        </HomeLink>
        <DatatlasLogo />
      </NavContainerLogo>

      {data && <ProjectButton>{data.title}</ProjectButton>}

      <NavItemsList>
        {Project.canProjectDtoBeEditedBy(data, user) && (
          <li>
            <button onClick={handleClickContributors}>
              <BadgesItem>
                <EditorsIcon />
              </BadgesItem>
              <FormattedMessage id={'navigationBar.contributors'} defaultMessage={'Contributors'} />
            </button>
          </li>
        )}
        {helpButtonEnabled && (
          <li>
            <NavItem to={'/'}>
              <BadgesItem>
                <HelpIcon />
              </BadgesItem>
              <FormattedMessage id={'navigationBar.help'} defaultMessage={'Aide'} />
            </NavItem>
          </li>
        )}
        {loggedIn && settingsButtonEnabled && (
          <li>
            <NavItem to={'/'}>
              <BadgesItem>
                <WheelIcon />
              </BadgesItem>
              <FormattedMessage id={'navigationBar.settings'} defaultMessage={'Réglages'} />
            </NavItem>
          </li>
        )}
        {loggedIn ? (
          <>
            <li>
              <button onClick={handleLogout}>
                <BadgesItem>
                  <Clock />
                </BadgesItem>
                <FormattedMessage id={'navigationBar.logout'} defaultMessage={'Logout'} />
              </button>
            </li>
            <li>
              <button disabled>
                <BadgesItem>
                  <AccountIcon username={user?.email} />
                </BadgesItem>
                {user?.email}
              </button>
            </li>
          </>
        ) : (
          <li>
            <button onClick={() => navigate('/login')}>
              <BadgesItem>
                <Clock />
              </BadgesItem>
              <FormattedMessage id={'navigationBar.login'} defaultMessage={'Login'} />
            </button>
          </li>
        )}
      </NavItemsList>
    </NavContainer>
  );
};

export default Navbar;
