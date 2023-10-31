/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Layers } from 'kepler.gl/dist/components/common/icons';
import { getTooltipDisplayValue, getTooltipDisplayDeltaValue } from 'kepler.gl/dist/utils/interaction-utils';
import KeplerLayerHoverInfoFactory, { StyledLayerName } from 'kepler.gl/dist/components/map/layer-hover-info';
import MapboxLayerGL from 'kepler.gl/src/layers/mapboxgl-layer';
import { TooltipField } from 'kepler.gl/src/reducers/vis-state-updaters';
import { DataRow } from 'kepler.gl/src/utils/table-utils/data-row';
import { DataContainerInterface } from 'kepler.gl/src/utils/table-utils/data-container-interface';
import { Field } from 'kepler.gl/src/utils/table-utils/kepler-table';
import { CompareType } from '@datatlas/models';
import { Button, OutlineButton } from '../../../buttons';
import { ExternalLink } from '../../../ExternalLink';
import { isImageURL, humanize } from '../../../../utils';

export const MapPopoverContent = styled.div`
  & .row__delta-value {
    text-align: right;

    &.positive {
      color: ${(props) => props.theme.primaryBtnBgd};
    }

    &.negative {
      color: ${(props) => props.theme.negativeBtnActBgd};
    }
  }
`;

interface RowProps extends Omit<ExpandedProps, 'setExpanded'> {
  name: string;
  value: number | string;
  deltaValue?: number | string | null;
  url?: string;
}

export const Row = ({ name, value, deltaValue, url, expanded }: RowProps) => {
  // Set 'url' to 'value' if it looks like a url
  if (!url && value && typeof value === 'string' && value.match(/^http/)) {
    url = value;
  }

  const className = classNames(['row', !value && 'empty']);
  const containerProps = {
    className,
    key: name,
  };

  // @todo We could also attempt to load the URL and see what's the content type.
  const asImg = /<img>/.test(name) || isImageURL(value as string);
  if (asImg) {
    return (
      <div {...containerProps} className={classNames([className, 'image-container'])}>
        <ExternalLink href={url}>
          <img src={value as string} alt={name} />
        </ExternalLink>
      </div>
    );
  }

  const asTitle = name.indexOf('adresse') !== -1;
  if (asTitle) {
    return (
      <div {...containerProps}>
        <ExternalLink href={url}>{asTitle ? <h3>{value}</h3> : value}</ExternalLink>
      </div>
    );
  }

  return (
    <dl {...containerProps}>
      {!asTitle && <dt className="row__name">{humanize(name)}</dt>}
      <dd className="row__value">
        <ExternalLink href={url}>{value}</ExternalLink>
      </dd>
      {deltaValue && (
        <dd className={`row__delta-value ${deltaValue.toString().charAt(0) === '+' ? 'positive' : 'negative'}`}>
          {deltaValue}
        </dd>
      )}
    </dl>
  );
};

const EntryInfo = ({
  fieldsToShow,
  fields,
  data,
  primaryData,
  compareType,
  expanded,
}: Omit<LayerHoverInfoProps, 'onClose'>) => (
  <div className="entry-info">
    {fieldsToShow.map((item) => (
      <EntryInfoRow
        key={item.name}
        item={item}
        fields={fields}
        data={data}
        primaryData={primaryData}
        compareType={compareType}
        expanded={expanded}
      />
    ))}
  </div>
);

interface EntryInfoRowProps extends Omit<LayerHoverInfoProps, 'fieldsToShow' | 'layer' | 'setExpanded' | 'onClose'> {
  item: TooltipField;
}

const EntryInfoRow = ({ item, fields, data, primaryData, compareType, expanded }: EntryInfoRowProps) => {
  const fieldIdx = fields.findIndex((f) => f.name === item.name);
  if (fieldIdx < 0) {
    return null;
  }
  const field = fields[fieldIdx];
  const displayValue = getTooltipDisplayValue({ item, field, data, fieldIdx });

  const displayDeltaValue = getTooltipDisplayDeltaValue({
    item,
    field,
    data,
    fieldIdx,
    primaryData,
    compareType,
  });

  return (
    <Row
      name={field.displayName || field.name}
      value={displayValue}
      deltaValue={displayDeltaValue}
      expanded={expanded}
    />
  );
};

// TODO: supporting comparative value for aggregated cells as well
const CellInfo = ({ data, layer, expanded }: Omit<LayerHoverInfoProps, 'setExpanded'>) => {
  const { colorField, sizeField } = layer.config;

  return (
    <>
      <Row name={'total points'} key="count" value={data.points && data.points.length} expanded={expanded} />
      {colorField && layer.visualChannels.color ? (
        <Row
          name={layer.getVisualChannelDescription('color').measure}
          key="color"
          value={data.colorValue || 'N/A'}
          expanded={expanded}
        />
      ) : null}
      {sizeField && layer.visualChannels.size ? (
        <Row
          name={layer.getVisualChannelDescription('size').measure}
          key="size"
          value={data.elevationValue || 'N/A'}
          expanded={expanded}
        />
      ) : null}
    </>
  );
};

export interface LayerHoverInfoProps extends ExpandedProps {
  fields: Field[];
  fieldsToShow: TooltipField[];
  layer: MapboxLayerGL;
  data: DataRow & {
    points: [number, number][];
    elevationValue: string;
    colorValue: string;
  };
  primaryData: DataContainerInterface;
  compareType: CompareType | null;
  onClose: () => void;
}

const MapPopoverActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Toolbar = styled.div``;

interface ExpandedProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

const LayerHoverInfoContainer = styled.div<Pick<LayerHoverInfoProps, 'layer'>>`
  .map-popover__layer-name {
    svg {
      fill: ${({ layer }) => `rgb(${layer.config.color.join(',')})`};
    }
  }
`;

const LayerHoverInfoFactory = () => {
  return (props: LayerHoverInfoProps) => {
    const { data, layer, expanded, setExpanded, onClose } = props;
    if (!data || !layer) {
      return null;
    }

    return (
      <LayerHoverInfoContainer
        className={classNames(['map-popover__layer-info', expanded && 'expanded'])}
        layer={layer}
      >
        <Toolbar className="map-popover__topbar">
          <StyledLayerName className="map-popover__layer-name">
            <Layers height="16px" style={{ fill: layer.config.color }} />
            {props.layer.config.label}
          </StyledLayerName>
          <Button onClick={() => setExpanded(false)}>×</Button>
        </Toolbar>

        <MapPopoverContent className="map-popover__content">
          {props.layer.isAggregated ? (
            <CellInfo {...props} expanded={expanded} />
          ) : (
            <EntryInfo {...props} expanded={expanded} />
          )}
        </MapPopoverContent>
        <MapPopoverActions className="map-popover__actions">
          <OutlineButton onClick={onClose}>Fermer</OutlineButton>
          <OutlineButton onClick={() => setExpanded(true)}>Voir la fiche détaillée</OutlineButton>
        </MapPopoverActions>
      </LayerHoverInfoContainer>
    );
  };
};

LayerHoverInfoFactory.deps = KeplerLayerHoverInfoFactory.deps;

export function replaceLayerHoverInfoFactory() {
  return [KeplerLayerHoverInfoFactory, LayerHoverInfoFactory];
}
