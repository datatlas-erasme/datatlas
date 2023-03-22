import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Button } from 'kepler.gl/dist/components/common/styled-components';

const StyledHowToButton = styled.div`
  position: absolute;
  right: 12px;
  top: -4px;
`;

export const HowToButton = ({ onClick }) => (
  <StyledHowToButton>
    <Button link small onClick={onClick}>
      <FormattedMessage id={'layerConfiguration.howTo'} />
    </Button>
  </StyledHowToButton>
);
