import React from 'react';
import styled from 'styled-components';
import { Button, SelectionButton, MapControlButton } from 'kepler.gl/dist/components/common/styled-components';
import { Trash, Delete } from 'kepler.gl/dist/components/common/icons';
import { IconButton, IconTextButton } from '../buttons';
const MapPreviewContainer = styled.div`
  display: flex;
  width: 30vw;
  height: 165px;
  padding: 10px;
  background-image: url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80');
`;

const ActionsContainer = styled.div`
  display: flex;
  align-self: end;
  height: 40px;
`;

const imageStyle = {
  width: `30vw`,
  height: `20vh`,
};

const MapPreview = (props) => {
  const removeProject = (e) => {
    e.preventDefault();
    console.log('DELETE');
  };
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
        <IconTextButton Icon={<Delete />} onClick={editProject}>
          PUBLIER
        </IconTextButton>
        <IconButton Icon={<Delete />} onClick={removeProject} />
        <IconButton Icon={<Trash />} onClick={duplicateProject} />
      </ActionsContainer>
    </MapPreviewContainer>
  );
};

export default MapPreview;
