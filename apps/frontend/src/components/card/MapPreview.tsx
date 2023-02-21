import React, { useState } from 'react';
import styled from 'styled-components';
import { Trash, Copy, MapIcon } from 'kepler.gl/dist/components/common/icons';
import { IconButton } from '../buttons';
import { StatusProjectBadges } from '../badges/StatusProjectBadges';
import backgroundMapImage from '../../assets/background-card.png';
interface MapPreviewInterface {
  draft: boolean;
  handleRemove: (e) => void;
  handleCopy: (e) => void;
  disable: boolean;
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

const MapPreview = ({ draft, handleRemove, handleCopy, disable }: MapPreviewInterface) => {
  return (
    <MapPreviewContainer>
      <StatusProjectBadges Icon={<MapIcon />}>
        <p>{draft ? 'Brouillon' : 'Publié'}</p>
      </StatusProjectBadges>
      <div>
        <IconButton Icon={<Trash />} onClick={handleRemove} />
        {!disable ? '' : <IconButton Icon={<Copy />} onClick={handleCopy} />}
      </div>
    </MapPreviewContainer>
  );
};
export default MapPreview;
