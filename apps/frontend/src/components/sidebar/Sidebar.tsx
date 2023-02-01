import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { StartNewProjectForm } from '../forms/StartNewProjectForm';
import { startNewProject } from '../../store/reducers/app/drafts';
import ProjectCard from '../card/ProjectCard';
import { Button } from '../buttons';
import { Simulate } from 'react-dom/test-utils';
import submit = Simulate.submit;

const SideBarContainer = styled.aside`
  grid-area: aside;
  padding: ${(props) => props.theme.layoutsBoxContainer};
  form {
    display: flex;
    flex-direction: column;
  }
`;

const Sidebar = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  return (
    <SideBarContainer>
      <h2>
        <FormattedMessage defaultMessage={'Démarrer un nouveau projet :'} />
      </h2>
      <StartNewProjectForm onSubmit={(data) => dispatch(startNewProject(data))} />
    </SideBarContainer>
  );
};

export default Sidebar;
