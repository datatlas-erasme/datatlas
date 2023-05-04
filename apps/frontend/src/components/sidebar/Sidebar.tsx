import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { StartNewProjectForm } from '../forms';

const SideBarContainer = styled.aside`
  position: sticky;
  top: 0;
  width: 30vw;
  padding: ${(props) => props.theme.layoutsBoxContainer};
  background-color: ${(props) => props.theme.sidebarProjectBG};
  form {
    display: flex;
    flex-direction: column;
  }
`;

const Sidebar = () => (
  <SideBarContainer>
    <h2>
      <FormattedMessage id={'sideBar.createProject'} defaultMessage={'Démarrer un nouveau projet'} />
    </h2>
    <StartNewProjectForm />
  </SideBarContainer>
);

export default Sidebar;
