import styled from 'styled-components';

export const StyledLayerConfigurator = styled.div.attrs({
  className: 'layer-panel__config',
})`
  position: relative;
  margin-top: ${({ theme }) => theme.layerConfiguratorMargin};
  padding: ${({ theme }) => theme.layerConfiguratorPadding};
  border-left: ${({ theme }) => theme.layerConfiguratorBorder} dashed
    ${({ theme }) => theme.layerConfiguratorBorderColor};
`;

export const StyledLayerVisualConfigurator = styled.div.attrs({
  className: 'layer-panel__config__visualC-config',
})`
  margin-top: 12px;
`;
