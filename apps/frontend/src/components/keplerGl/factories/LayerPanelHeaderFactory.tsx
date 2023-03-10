import { LayerPanelHeaderFactory as KeplerLayerPanelHeaderFactory } from 'kepler.gl/components';
import React, { FunctionComponent, UIEventHandler, useState } from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { DragHandle } from 'kepler.gl/dist/components/side-panel/layer-panel/layer-panel-header';
import { Copy, ArrowDown, EyeSeen, EyeUnseen, Trash, VertDots } from 'kepler.gl/dist/components/common/icons';
import { StyledPanelHeader } from 'kepler.gl/dist/components/common/styled-components';
import { HelpIcon } from '../../icon';

const StyledLayerPanelHeader = styled(StyledPanelHeader)`
  height: ${(props) => props.theme.layerPanelHeaderHeight}px;
  .layer__remove-layer {
    opacity: 0;
  }
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.panelBackgroundHover};

    .layer__drag-handle {
      opacity: 1;
    }

    .layer__remove-layer {
      opacity: 1;
    }
  }
`;

const HeaderLabelSection = styled.div`
  display: flex;
  color: ${(props) => props.theme.textColor};
`;

const HeaderActionSection = styled.div`
  display: flex;
`;

export interface LayerPanelProps {
  isConfigActive: boolean;
  isDragNDropEnabled: boolean;
  isVisible: boolean;
  label: string;
  layerId: string;
  layerType: string;
  labelRCGColorValues: number[];
  onToggleVisibility: UIEventHandler;
  onUpdateLayerLabel: UIEventHandler;
  onToggleEnableConfig: UIEventHandler;
  onDuplicateLayer: UIEventHandler;
  onRemoveLayer: UIEventHandler;
  showRemoveLayer: boolean;
  actionIcons: Record<string, FunctionComponent>;
}

const defaultActionIcons = {
  remove: Trash,
  visible: EyeSeen,
  hidden: EyeUnseen,
  enableConfig: ArrowDown,
  duplicate: Copy,
  custom: HelpIcon,
};

const LayerPanelHeaderFactory = (LayerTitleSection, PanelHeaderAction) => {
  // const KeplerLayerPanelHeader = KeplerLayerPanelHeaderFactory(...deps);

  return ({
    isConfigActive,
    isDragNDropEnabled,
    isVisible,
    label,
    layerId,
    layerType,
    labelRCGColorValues,
    onToggleVisibility,
    onUpdateLayerLabel,
    onToggleEnableConfig,
    onDuplicateLayer,
    onRemoveLayer,
    showRemoveLayer,
    actionIcons = defaultActionIcons,
  }: LayerPanelProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setOpen] = useState(false);
    const toggleLayerConfigurator = (e) => {
      setOpen(!isOpen);
      onToggleEnableConfig(e);
    };
    return (
      <StyledLayerPanelHeader
        className={classnames('layer-panel__header', {
          'sort--handle': !isConfigActive,
        })}
        active={isConfigActive}
        labelRCGColorValues={labelRCGColorValues}
        onClick={toggleLayerConfigurator}
      >
        <HeaderLabelSection className="layer-panel__header__content">
          {isDragNDropEnabled && (
            <DragHandle className="layer__drag-handle">
              <VertDots height="20px" />
            </DragHandle>
          )}
          <LayerTitleSection
            layerId={layerId}
            label={label}
            onUpdateLayerLabel={onUpdateLayerLabel}
            layerType={layerType}
          />
        </HeaderLabelSection>
        <HeaderActionSection className="layer-panel__header__actions">
          {showRemoveLayer ? (
            // @todo remove dataset instead
            <PanelHeaderAction
              className="layer__remove-layer"
              id={layerId}
              tooltip={'tooltip.removeLayer'}
              onClick={onRemoveLayer}
              tooltipType="error"
              IconComponent={actionIcons.remove}
            />
          ) : null}
          <PanelHeaderAction
            className="layer__visibility-toggle"
            id={layerId}
            tooltip={isVisible ? 'tooltip.hideLayer' : 'tooltip.showLayer'}
            onClick={onToggleVisibility}
            IconComponent={isVisible ? actionIcons.visible : actionIcons.hidden}
          />
          <PanelHeaderAction
            className="layer__duplicate"
            id={layerId}
            tooltip={'tooltip.duplicateLayer'}
            onClick={onDuplicateLayer}
            IconComponent={actionIcons.duplicate}
          />
          {/* @todo show datatable instead */}
          <PanelHeaderAction
            className="layer__custom_action"
            id={layerId}
            tooltip={'tooltip.customAction'}
            onClick={(e) => {
              console.log("Hi Olivier, I'm a custom action !");
              e.preventDefault();
            }}
            IconComponent={actionIcons.custom}
          />
          <PanelHeaderAction
            className={classnames('layer__enable-config ', {
              'is-open': isOpen,
            })}
            id={layerId}
            tooltip={'tooltip.layerSettings'}
            onClick={toggleLayerConfigurator}
            IconComponent={actionIcons.enableConfig}
          />
        </HeaderActionSection>
      </StyledLayerPanelHeader>
    );
  };
};

LayerPanelHeaderFactory.deps = KeplerLayerPanelHeaderFactory.deps;

export function replaceLayerPanelHeader() {
  return [KeplerLayerPanelHeaderFactory, LayerPanelHeaderFactory];
}
