import React from 'react';
import styled from 'styled-components';
import { Trash, Copy, MapIcon } from 'kepler.gl/dist/components/common/icons';
import { LoadingProjectInterface, Project, UserInterface } from '@datatlas/models';
import { IconButton } from '../buttons';
import { StatusProjectBadges } from '../badges';
import backgroundMapImage from '../../assets/background-card.png';

interface MapPreviewInterface {
  project: LoadingProjectInterface;
  user?: UserInterface;
  handleRemove: (e) => void;
  handleCopy: (e) => void;
  copyEnabled?: boolean;
}

const MapPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  padding: ${(props) => props.theme.cardBoxContainer};
  background-image: url(${backgroundMapImage});
`;

const MapPreview = ({ project, user, handleRemove, handleCopy, copyEnabled = false }: MapPreviewInterface) => {
  return (
    <MapPreviewContainer>
      <StatusProjectBadges Icon={<MapIcon />}>
        <p>{project.draft ? 'Brouillon' : 'Publié'}</p>
      </StatusProjectBadges>
      <div>
        {Project.canBeDeletedBy(project, user) && <IconButton Icon={<Trash />} onClick={handleRemove} />}
        {copyEnabled && <IconButton Icon={<Copy />} onClick={handleCopy} />}
      </div>
    </MapPreviewContainer>
  );
};
export default MapPreview;
