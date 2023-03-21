import { LayerPanelHeaderFactory as KeplerLayerPanelHeaderFactory } from 'kepler.gl/components';
import React, { FunctionComponent, UIEventHandler, useState } from 'react';
import classnames from 'classnames';
import { Copy, ArrowDown, EyeSeen, EyeUnseen, Trash } from 'kepler.gl/dist/components/common/icons';
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
      </LayerPanelHeader>
    );
  };
};

LayerPanelHeaderFactory.deps = KeplerLayerPanelHeaderFactory.deps;

export function replaceLayerPanelHeader() {
  return [KeplerLayerPanelHeaderFactory, LayerPanelHeaderFactory];
}
