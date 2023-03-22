import styled from 'styled-components';

export const StyledLayerConfigurator = styled.div.attrs({
  className: 'layer-panel__config',
})`
  position: relative;
  margin-top: ${(props) => props.theme.layerConfiguratorMargin};
  padding: ${(props) => props.theme.layerConfiguratorPadding};
  border-left: ${(props) => props.theme.layerConfiguratorBorder} dashed
    ${(props) => props.theme.layerConfiguratorBorderColor};
`;

export const StyledLayerVisualConfigurator = styled.div.attrs({
  className: 'layer-panel__config__visualC-config',
})`
  margin-top: 12px;
`;
