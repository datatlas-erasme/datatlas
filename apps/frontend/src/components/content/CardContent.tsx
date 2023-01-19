import React from 'react';
import styled from 'styled-components';
import InfoProjectButton from '../buttons/InfoProjectButton';

const ContentCardContainer = styled.div`
  padding: 10px;
  background-color: white;

  h3 {
    margin: 0;
  }
`;

const ActionsCardContainer = styled.div`
  display: flex;
  list-style: none;
  justify-content: space-around;
  margin: 10px 0;
`;

const StatusModif = styled.p`
  color: #cecece;
  margin: 0;
`;

const CardContent = () => (
  <ContentCardContainer>
    <div>
      <h3>Titre de carte</h3>
      <StatusModif>Modifié il y a 6h.</StatusModif>
      <StatusModif>Les modifications sont à valider !</StatusModif>
    </div>

    <ActionsCardContainer>
      <InfoProjectButton />
    </ActionsCardContainer>
  </ContentCardContainer>
);

export default CardContent;
