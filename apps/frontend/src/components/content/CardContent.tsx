import React from 'react';
import styled from 'styled-components';
import { PanelHeaderTitle, ButtonGroup } from 'kepler.gl/dist/components/common/styled-components';

const ContentCardContainer = styled.div`
  padding: 10px;
  background-color: white;
`;

const CardContent = () => (
  <ContentCardContainer>
    <div>
      <PanelHeaderTitle>Titre de carte</PanelHeaderTitle>
      <p>Je suis une belle phrase de carte qui explique des trucs sympas.</p>
    </div>

    <ButtonGroup>
      <li>
        <button>Actions</button>
      </li>
      <li>
        <button>Actions</button>
      </li>
    </ButtonGroup>
  </ContentCardContainer>
);

export default CardContent;
