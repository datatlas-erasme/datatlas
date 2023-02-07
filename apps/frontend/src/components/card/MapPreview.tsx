import React from 'react';
import styled from 'styled-components';
import { Trash, Delete, MapIcon } from 'kepler.gl/dist/components/common/icons';
import { IconButton } from '../buttons';
import { StatusProjectBadges } from '../badges/StatusProjectBadges';
import backgroundMapImage from '../../assets/background-card.png';
interface MapPreviewInterface {
  draft: boolean;
  handleRemove: (e) => void;
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

const MapPreview = ({ draft, handleRemove }: MapPreviewInterface) => {
  const duplicateProject = (e) => {
    e.preventDefault();
    console.log('DUPLICATE');
  };

  return (
    <MapPreviewContainer>
      <StatusProjectBadges Icon={<MapIcon />}>
        <p>{draft ? 'Brouillon' : 'Publié'}</p>
      </StatusProjectBadges>
      <div>
        <IconButton Icon={<Delete />} onClick={handleRemove} />
        <IconButton Icon={<Trash />} onClick={duplicateProject} />
      </div>
    </MapPreviewContainer>
  );
};
export default MapPreview;
