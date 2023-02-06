import React from 'react';
import styled from 'styled-components';
import { Trash, Delete, MapIcon } from 'kepler.gl/dist/components/common/icons';
import { IconButton, Button } from '../buttons';

interface MapPreviewInterface {
  draft: boolean;
  handleRemove: (e) => void;
}

const MapPreviewContainer = styled.div`
  display: flex;
  width: 60%;
  padding: 10px;
  background-image: url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80');
`;

const ActionsContainer = styled.div`
  display: flex;
  align-self: end;
  height: 40px;
`;

const MapPreview = ({ draft, handleRemove }: MapPreviewInterface) => {
  const duplicateProject = (e) => {
    e.preventDefault();
    console.log('DUPLICATE');
  };
  const editProject = (e) => {
    e.preventDefault();
    console.log('EDIT');
  };

  return (
    <MapPreviewContainer>
      <ActionsContainer>
        <Button Icon={<MapIcon />} onClick={editProject}>
          {draft ? 'Brouillon' : 'Publié'}
        </Button>
        <IconButton Icon={<Delete />} onClick={handleRemove} />
        <IconButton Icon={<Trash />} onClick={duplicateProject} />
      </ActionsContainer>
    </MapPreviewContainer>
  );
};
export default MapPreview;
