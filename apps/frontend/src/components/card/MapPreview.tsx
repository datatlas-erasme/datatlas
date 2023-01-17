import React from 'react';
import styled from 'styled-components';
import { Button, SelectionButton, MapControlButton } from 'kepler.gl/dist/components/common/styled-components';
import { Trash, Delete } from 'kepler.gl/dist/components/common/icons';

const MapPreviewContainer = styled.div`
  display: flex;
  width: 30vw;
  background-image: url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80');
`;

const UlActions = styled.ul`
  display: flex;
  list-style: none;
`;

const imageStyle = {
  width: `30vw`,
  height: `20vh`,
};

const MapPreview = (props) => {
  console.log(props);

  return (
    <MapPreviewContainer>
      <SelectionButton>
        <Delete height="18px" />
        Publier
      </SelectionButton>
      <MapControlButton>
        <Trash height="18px" />
      </MapControlButton>
    </MapPreviewContainer>
  );
};

export default MapPreview;
