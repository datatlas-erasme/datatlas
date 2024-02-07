import React, {MouseEventHandler, useState} from 'react';
import classnames from 'classnames';
import styled, {css} from 'styled-components';
import {
  DragHandle,
  InlineInput,
  LayerLabelEditorProps,
  LayerPanelHeaderFactory as KeplerLayerPanelHeaderFactory,
  LayerPanelHeaderProps as KeplerLayerPanelHeaderProps,
  LayerTitleSectionProps,
  PanelHeaderActionFactory,
  StyledPanelHeader
} from '@kepler.gl/components';
import {
  ArrowDown,
  Copy,
  DataTable,
  EyeSeen,
  EyeUnseen,
  Reset,
  VertDots,
  Trash
} from '@kepler.gl/components/dist/common/icons';
import {HeaderWarning} from '@kepler.gl/components/dist/side-panel/layer-panel/layer-panel-header';
import {dataTestIds} from '@kepler.gl/constants';
import {FormattedMessage} from 'react-intl';
import {HelpIcon} from '../../icon';

type HeaderActionSectionProps = {
  isEditingLabel: boolean;
};

export type LayerPanelHeaderActionSectionProps = LayerPanelHeaderProps & HeaderActionSectionProps;

export const defaultProps = {
  isDragNDropEnabled: true,
  showRemoveLayer: true
};

const getBorderCss = status =>
  css`
    border-top: 2px solid ${({theme}) => theme.notificationColors[status]};
    border-bottom: 2px solid ${({theme}) => theme.notificationColors[status]};
    border-right: 2px solid ${({theme}) => theme.notificationColors[status]};
  `;

const StyledLayerPanelHeader = styled(StyledPanelHeader)`
  height: ${props => props.theme.layerPanelHeaderHeight}px;
  position: relative;
  align-items: stretch;

  .layer__remove-layer {
    opacity: 0;
  }

  .layer__drag-handle__placeholder {
    height: 20px;
    padding: 10px;
  }

  ${props => (props.warning ? getBorderCss('warning') : props.isValid ? '' : getBorderCss('error'))}

  :hover {
    cursor: pointer;
    background-color: ${props => props.theme.panelBackgroundHover};

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
  color: ${props => props.theme.textColor};
  flex-grow: 1;
  align-items: stretch;
  // leave space for eye and collapse icon
  padding-right: 50px;
`;

const HeaderActionSection = styled.div<HeaderActionSectionProps>`
  display: flex;
  position: absolute;
  height: 100%;
  align-items: stretch;
  right: 10px;
  pointer-events: ${props => (props.isEditingLabel ? 'none' : 'all')};
  :hover {
    .layer-panel__header__actions__hidden {
      opacity: 1;
      background-color: ${props => props.theme.panelBackgroundHover};
    }
  }
`;

type StyledPanelHeaderHiddenActionsProps = {
  isConfigActive: LayerPanelHeaderProps['isConfigActive'];
};

// Hiden actions only show up on hover
const StyledPanelHeaderHiddenActions = styled.div.attrs({
  className: 'layer-panel__header__actions__hidden'
})<StyledPanelHeaderHiddenActionsProps>`
  opacity: 0;
  display: flex;
  align-items: center;
  background-color: ${props =>
    props.isConfigActive ? props.theme.panelBackgroundHover : props.theme.panelBackground};
  transition: opacity 0.4s ease, background-color 0.4s ease;

  :hover {
    opacity: 1;
  }
`;

const noOp = (event: MouseEvent) => {
  event.stopPropagation();
  event.preventDefault();
};

export const LayerLabelEditor: React.FC<LayerLabelEditorProps> = ({
  layerId,
  label,
  onEdit,
  onFocus,
  onBlur
}) => (
  <InlineInput
    type="text"
    className="layer__title__editor"
    data-testid={dataTestIds.layerTitleEditor}
    value={label}
    /*
    // @ts-ignore */
    onClick={noOp}
    onChange={onEdit}
    onFocus={onFocus}
    onBlur={onBlur}
    id={`${layerId}:input-layer-label`}
  />
);

export function LayerTitleSectionFactory() {
  const StyledLayerTitleSection = styled.div`
    margin-left: 4px;
    flex-grow: 1;
    align-items: center;
    display: flex;
    .layer__title__inner {
      flex-grow: 1;
    }

    .layer__title__type {
      color: ${props => props.theme.subtextColor};
      font-size: 10px;
      line-height: 12px;
      letter-spacing: 0.37px;
      text-transform: capitalize;
    }
  `;
  const LayerTitleSection: React.FC<LayerTitleSectionProps> = ({
    layerType,
    layerId,
    label,
    onUpdateLayerLabel,
    onFocus,
    onBlur
  }) => (
    <StyledLayerTitleSection className="layer__title">
      <div>
        <LayerLabelEditor
          layerId={layerId}
          label={label}
          onEdit={onUpdateLayerLabel}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <div className="layer__title__type">
          {layerType && <FormattedMessage id={`layer.type.${layerType.toLowerCase()}`} />}
        </div>
      </div>
    </StyledLayerTitleSection>
  );
  return LayerTitleSection;
}

LayerPanelHeaderActionSectionFactory.deps = [PanelHeaderActionFactory];

export function LayerPanelHeaderActionSectionFactory(
  PanelHeaderAction: ReturnType<typeof PanelHeaderActionFactory>
) {
  const LayerPanelHeaderActionSection: React.FC<LayerPanelHeaderActionSectionProps> = (
    props: LayerPanelHeaderActionSectionProps
  ) => {
    const {
      isConfigActive,
      allowDuplicate,
      isVisible,
      isValid,
      layerId,
      onToggleVisibility,
      onResetIsValid,
      onToggleEnableConfig,
      onDuplicateLayer,
      onRemoveLayer,
      showRemoveLayer,
      showDatasetTable,
      isEditingLabel,
      // TODO: may not contain all necessary icons for all actions, e.g. actionIcons.duplicate. Need to to merge rather than replace
      actionIcons = defaultActionIcons
    } = props;
    return (
      <HeaderActionSection className="layer-panel__header__actions" isEditingLabel={isEditingLabel}>
        <StyledPanelHeaderHiddenActions isConfigActive={isConfigActive}>
          {showRemoveLayer ? (
            <PanelHeaderAction
              className="layer__remove-layer"
              testId="remove-layer-action"
              id={layerId}
              tooltip={'tooltip.removeLayer'}
              onClick={onRemoveLayer}
              tooltipType="error"
              IconComponent={actionIcons.remove}
            />
          ) : null}
          <PanelHeaderAction
            className="layer__duplicate"
            id={layerId}
            tooltip={'tooltip.duplicateLayer'}
            onClick={onDuplicateLayer}
            IconComponent={actionIcons.duplicate}
            disabled={!allowDuplicate}
          />
        </StyledPanelHeaderHiddenActions>
        {isValid ? (
          <PanelHeaderAction
            className="layer__visibility-toggle"
            id={layerId}
            tooltip={isVisible ? 'tooltip.hideLayer' : 'tooltip.showLayer'}
            onClick={onToggleVisibility}
            IconComponent={isVisible ? actionIcons.visible : actionIcons.hidden}
          />
        ) : (
          <PanelHeaderAction
            className="layer__is-valid-refresh"
            id={layerId}
            tooltip={'tooltip.resetAfterError'}
            onClick={onResetIsValid}
            IconComponent={actionIcons.resetIsValid}
          />
        )}

        <PanelHeaderAction
          className="layer__show-data-table"
          id={layerId}
          tooltip={'datasetTitle.showDataTable'}
          onClick={showDatasetTable}
          IconComponent={DataTable}
        />

        <PanelHeaderAction
          className={classnames('layer__enable-config ', {
            'is-open': isConfigActive
          })}
          id={layerId}
          tooltip={'tooltip.layerSettings'}
          onClick={onToggleEnableConfig}
          IconComponent={actionIcons.enableConfig}
        />
      </HeaderActionSection>
    );
  };

  return LayerPanelHeaderActionSection;
}

const defaultActionIcons = {
  remove: Trash,
  visible: EyeSeen,
  hidden: EyeUnseen,
  enableConfig: ArrowDown,
  duplicate: Copy,
  resetIsValid: Reset,
  custom: HelpIcon
};

export type LayerPanelHeaderProps = KeplerLayerPanelHeaderProps & {
  showDatasetTable: MouseEventHandler;
};

LayerPanelHeaderFactory.deps = KeplerLayerPanelHeaderFactory.deps;

export function LayerPanelHeaderFactory(
  LayerTitleSection: ReturnType<typeof LayerTitleSectionFactory>,
  LayerPanelHeaderActionSection: ReturnType<typeof LayerPanelHeaderActionSectionFactory>
) {
  const LayerPanelHeader: React.FC<LayerPanelHeaderProps> = props => {
    const {
      isConfigActive,
      isDragNDropEnabled,
      isValid,
      warning,
      label,
      layerId,
      layerType,
      labelRCGColorValues,
      onUpdateLayerLabel,
      onToggleEnableConfig,
      listeners
    } = props;
    const [isEditingLabel, setIsEditingLabel] = useState(false);
    return (
      <StyledLayerPanelHeader
        className={classnames('layer-panel__header', {
          'sort--handle': !isConfigActive
        })}
        isValid={isValid}
        warning={warning}
        active={isConfigActive}
        labelRCGColorValues={labelRCGColorValues}
        onClick={onToggleEnableConfig}
      >
        {warning ? <HeaderWarning warning={warning} id={layerId} /> : null}
        <HeaderLabelSection className="layer-panel__header__content">
          {isDragNDropEnabled ? (
            <DragHandle className="layer__drag-handle" listeners={listeners}>
              <VertDots height="20px" />
            </DragHandle>
          ) : (
            <div className="layer__drag-handle__placeholder" />
          )}
          <LayerTitleSection
            layerId={layerId}
            label={label}
            onUpdateLayerLabel={onUpdateLayerLabel}
            layerType={layerType}
            onFocus={() => {
              setIsEditingLabel(true);
            }}
            onBlur={() => {
              setIsEditingLabel(false);
            }}
          />
        </HeaderLabelSection>
        <LayerPanelHeaderActionSection {...props} isEditingLabel={isEditingLabel} />
      </StyledLayerPanelHeader>
    );
  };

  LayerPanelHeader.defaultProps = defaultProps;

  return LayerPanelHeader;
}

export function replaceLayerPanelHeader() {
  return [KeplerLayerPanelHeaderFactory, LayerPanelHeaderFactory];
}
