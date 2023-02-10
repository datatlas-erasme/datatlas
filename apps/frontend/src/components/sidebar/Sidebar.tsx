import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { StartNewProjectForm } from '../forms/StartNewProjectForm';
import { createMap } from '../../store/reducers/keplerGl';
import { TitleH2 } from '../../style/theme';

const SideBarContainer = styled.aside`
  grid-column: 2;
  grid-row: 1 / 2;
  padding: ${(props) => props.theme.layoutsBoxContainer};
  background-color: ${(props) => props.theme.sidebarProjectBG};
  form {
    display: flex;
    flex-direction: column;
  }
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <SideBarContainer>
      <TitleH2>
        <FormattedMessage defaultMessage={'Démarrer un nouveau projet'} />
      </TitleH2>
      <StartNewProjectForm onSubmit={(data) => dispatch(createMap(data))} />
    </SideBarContainer>
  );
};

export default Sidebar;
