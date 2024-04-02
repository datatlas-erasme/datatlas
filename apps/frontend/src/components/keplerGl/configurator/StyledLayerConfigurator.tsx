import styled from 'styled-components';

export const StyledLayerConfigurator = styled.div.attrs({
  className: 'layer-panel__config'
})`
  position: relative;
  margin-top: ${({theme}) => theme.layerConfiguratorMargin};
  padding: ${({theme}) => theme.layerConfiguratorPadding};
  border-bottom: ${({theme}) => theme.panelBorderLT};
  :active {
    background-color: ${({theme}) => theme.panelBackground};
  }
`;

export const StyledLayerVisualConfigurator = styled.div.attrs({
  className: 'layer-panel__config__visual-config'
})`
  margin-top: 12px;
`;
