import React from 'react';
import { useAppSelector } from '../store/reducers';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { ProjectList } from '../components/ProjectList';
import Sidebar from '../components/sidebar/Sidebar';
import { AuthenticatedGuard } from '../components/guards';
import { useGetProjectsQuery } from '../store/api';
import { selectCommunityProjects, selectMyProjects } from '../store/selectors';

const LayoutProjects = styled.div`
  display: flex;
  flex: auto;
  width: 100vw;
  background-color: ${({ theme }) => theme.layoutBGColor};
`;

const ProjectsContainer = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 70vw;
  align-items: center;
  padding: ${({ theme }) => theme.layoutsBoxContainer};
`;

const HeaderProjects = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ theme }) => theme.cardBoxContainer};

  h2 {
    padding-top: 2px;
    padding-bottom: 5px;
  }

  p {
    padding-top: 2px;
    padding-bottom: 5px;
  }
`;

export const ProjectsPage = () => {
  const { isLoading, isFetching, isSuccess, isError, error } = useGetProjectsQuery();
  const myProjects = useAppSelector(selectMyProjects);
  const communityProjects = useAppSelector(selectCommunityProjects);

  return (
    <React.StrictMode>
      <AuthenticatedGuard>
        <LayoutProjects>
          <ProjectsContainer>
            <HeaderProjects>
              <h2>
                <FormattedMessage id={'dashboard.my_projects'} defaultMessage={'Mes Projets'} />
              </h2>
            </HeaderProjects>
            <ProjectList
              data={myProjects}
              isLoading={isLoading}
              isFetching={isFetching}
              isSuccess={isSuccess}
              isError={isError}
              error={error}
            />
            <HeaderProjects>
              <h2>
                <FormattedMessage id={'dashboard.community_projects'} defaultMessage={'Communauté Datatlas'} />
              </h2>
            </HeaderProjects>
            <>
              <p>
                Vous trouverez ici les projets partagés par l’ensemble de la communauté Datatlas, n’hésitez pas à les
                découvrir et à vous en inspirer !
              </p>
              <ProjectList
                data={communityProjects}
                isLoading={isLoading}
                isFetching={isFetching}
                isSuccess={isSuccess}
                isError={isError}
                error={error}
              />
            </>
          </ProjectsContainer>
          <Sidebar />
        </LayoutProjects>
      </AuthenticatedGuard>
    </React.StrictMode>
  );
};
