import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { StartNewProjectForm } from '../forms/StartNewProjectForm';
import { createMap } from '../../store/reducers/keplerGl';

const SideBarContainer = styled.aside`
  grid-area: aside;
  padding: ${(props) => props.theme.layoutsBoxContainer};
  form {
    display: flex;
    flex-direction: column;
  }
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <SideBarContainer>
      <h2>
        <FormattedMessage defaultMessage={'Démarrer un nouveau projet :'} />
      </h2>
      <StartNewProjectForm onSubmit={(data) => dispatch(createMap(data))} />
    </SideBarContainer>
  );
};

export default Sidebar;
