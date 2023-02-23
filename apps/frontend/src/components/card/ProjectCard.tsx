import React from 'react';
import { deleteEntry } from 'kepler.gl/actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProjectInterface } from '@datatlas/shared/models';
import MapPreview from './MapPreview';
import CardDetails from './CardDetails';
import { useAppDispatch } from '../../store';

export type ProjectCardProps = ProjectInterface;

const CardContainer = styled(Link)`
  display: flex;
  position: relative;
  width: ${(props) => props.theme.cardWidth};
  padding: ${(props) => props.theme.cardBoxContainer};
`;

const ProjectCard = (props: ProjectCardProps) => {
  const dispatch = useAppDispatch();
  const handleRemove = (e) => {
    e.preventDefault();
    dispatch(deleteEntry(props.id));
  };
  const handleCopy = (e) => {
    e.preventDefault();
    console.log('DUPLICATE');
  };
  return (
    <CardContainer to={`/projects/${props.id}`} key={props.id}>
      <CardDetails
        title={props.title}
        owner={props.owner}
        createdAt={props.createdAt}
        description={props.description}
        contributors={props.contributors}
      />
      <MapPreview draft={props.draft} handleRemove={handleRemove} handleCopy={handleCopy} />
    </CardContainer>
  );
};

export default ProjectCard;
