import { LayerPanelHeaderFactory as KeplerLayerPanelHeaderFactory } from 'kepler.gl/components';
import React, { FunctionComponent, UIEventHandler, useState } from 'react';
import classnames from 'classnames';
import { Copy, ArrowDown, EyeSeen, EyeUnseen, Table, Trash } from 'kepler.gl/dist/components/common/icons';
import { HelpIcon } from '../../icon';
import { LayerPanelHeader } from '../side-panel/layer/LayerPanelHeader';

export interface KeplerLayerPanelHeaderPropsInterface {
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
  showDatasetTable: UIEventHandler;
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
  // Uncomment next line to restore original behavior:
  // return KeplerLayerPanelHeaderFactory(...KeplerLayerPanelHeaderFactory.deps);

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
    onRemoveLayer,
    showRemoveLayer,
    showDatasetTable,
    actionIcons = defaultActionIcons,
  }: KeplerLayerPanelHeaderPropsInterface) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setOpen] = useState(false);
    const toggleLayerConfigurator = (e) => {
      setOpen(!isOpen);
      onToggleEnableConfig(e);
    };

    return (
      <LayerPanelHeader
        isActive={isConfigActive}
        isDragNDropEnabled={isDragNDropEnabled}
        labelRCGColorValues={labelRCGColorValues}
        onToggleEnableConfig={onToggleEnableConfig}
        layerTitleSection={
          <LayerTitleSection
            layerId={layerId}
            label={label}
            onUpdateLayerLabel={onUpdateLayerLabel}
            layerType={layerType}
          />
        }
      >
        {showRemoveLayer ? (
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
          className="layer__show-data-table"
          id={layerId}
          tooltip={'tooltip.showDataTable'}
          onClick={showDatasetTable}
          IconComponent={Table}
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
      </LayerPanelHeader>
    );
  };
};

LayerPanelHeaderFactory.deps = KeplerLayerPanelHeaderFactory.deps;

export function replaceLayerPanelHeader() {
  return [KeplerLayerPanelHeaderFactory, LayerPanelHeaderFactory];
}
