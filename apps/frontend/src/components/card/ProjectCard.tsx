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

const ProjectCard = ({ id, title, draft, owner, updatedAt, description }: ProjectCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <CardContainer to={`/projects/${id}`} key={id}>
      <MapPreview draft={draft} handleRemove={() => dispatch(deleteEntry(id))} />
      <CardDetails title={title} owner={owner.name} updatedAt={updatedAt} description={description} />
      <Link to={`/projects/${id}`}>Voir le projet</Link>
    </CardContainer>
  );
};

export default ProjectCard;
