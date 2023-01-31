import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { StartNewProjectForm } from '../forms/StartNewProjectForm';
import { startNewProject } from '../../store/reducers/app/drafts';
import ProjectCard from '../card/ProjectCard';

interface SideBarInterface {
  children: ReactNode;
}

const SideBarContainer = styled.aside`
  grid-area: aside;
  padding: ${(props) => props.theme.layoutsBoxContainer};
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <SideBarContainer>
      <h2>Démarrer un nouveau projet :</h2>
      <form>
        <div>
          <label>1. Entrez le nom du projet</label>
          <input />
        </div>
        <div>
          <label>2. Sélectionnez un fond de carte</label>
          <StartNewProjectForm onSubmit={(data) => dispatch(startNewProject(data))} />
        </div>
        <div>
          <label>3. Choisissez un modèle</label>
          <ProjectCard id={'idCard1'} name={'default'} draft={true} datasets={[]} ownerId={1} />
        </div>
      </form>
    </SideBarContainer>
  );
};

export default Sidebar;
