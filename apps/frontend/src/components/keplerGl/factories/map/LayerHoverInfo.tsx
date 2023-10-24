import React from 'react';
import styled from 'styled-components';
import { Layers } from 'kepler.gl/dist/components/common/icons';
import { notNullorUndefined } from 'kepler.gl/dist/utils/data-utils';
import { getTooltipDisplayValue, getTooltipDisplayDeltaValue } from 'kepler.gl/dist/utils/interaction-utils';
import KeplerLayerHoverInfoFactory, { StyledLayerName } from 'kepler.gl/dist/components/map/layer-hover-info';
import { Layer } from 'kepler.gl';
import { TooltipField } from 'kepler.gl/src/reducers/vis-state-updaters';
import { DataContainerInterface } from 'kepler.gl/src/utils/table-utils/data-container-interface';
import { Field } from 'kepler.gl/src/utils/table-utils/kepler-table';
import { Button } from '../../../buttons';
import { DataRow } from 'kepler.gl/src/utils/table-utils/data-row';

enum CompareType {
  ABSOLUTE = 'absolute',
  RELATIVE = 'relative',
}

const isImageURL = (value: number | string) => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(value);
};

// const isImageField = (partialField: Pick<Field, 'name' | 'displayName' | 'value'>)

const humanize = (label: string) =>
  label
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/^[a-z]/, (m) => m.toUpperCase());

export const StyledTable = styled.div`
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

interface RowProps {
  name: string;
  value: number | string;
  deltaValue?: number | string | null;
  url?: string;
}

export const Row = styled(({ name, value, deltaValue, url }: RowProps) => {
  // Set 'url' to 'value' if it looks like a url
  if (!url && value && typeof value === 'string' && value.match(/^http/)) {
    url = value;
  }

  // @todo We could also attempt to load the URL and see what's the content type.
  const asImg = /<img>/.test(name) || isImageURL(value);

  if (asImg) {
    return (
      <div className="row">
        <img src={value} alt={name} />
      </div>
    );
  }

  const asTitle = name.indexOf('nom');

  return (
    <dl className="row" key={name}>
      <dt className="row__name">{humanize(name)}</dt>
      <dt className="row__value">
        {url ? (
          <a target="_blank" rel="noopener noreferrer" href={url}>
            {asTitle ? <h3>{value}</h3> : value}
          </a>
        ) : asTitle ? (
          <h3>{value}</h3>
        ) : (
          value
        )}
      </dt>
      {notNullorUndefined(deltaValue) && (
        <dd className={`row__delta-value ${deltaValue.toString().charAt(0) === '+' ? 'positive' : 'negative'}`}>
          {deltaValue}
        </dd>
      )}
    </dl>
  );
})``;

const EntryInfo = ({ fieldsToShow, fields, data, primaryData, compareType }: LayerHoverInfoProps) => (
  <div className="entry-info">
    {fieldsToShow.map((item) => (
      <EntryInfoRow
        key={item.name}
        item={item}
        fields={fields}
        data={data}
        primaryData={primaryData}
        compareType={compareType}
      />
    ))}
  </div>
);

// const getEntryInfo

interface EntryInfoProps extends Omit<LayerHoverInfoProps, 'fieldsToShow' | 'layer'> {
  item: TooltipField;
}

const EntryInfoRow = ({ item, fields, data, primaryData, compareType }: EntryInfoProps) => {
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

  return <Row name={field.displayName || field.name} value={displayValue} deltaValue={displayDeltaValue} />;
};

// TODO: supporting comparative value for aggregated cells as well
const CellInfo = ({ data, layer }: LayerHoverInfoProps) => {
  const { colorField, sizeField } = layer.config;

  return (
    <>
      <Row name={'total points'} key="count" value={data.points && data.points.length} />
      {colorField && layer.visualChannels.color ? (
        <Row name={layer.getVisualChannelDescription('color').measure} key="color" value={data.colorValue || 'N/A'} />
      ) : null}
      {sizeField && layer.visualChannels.size ? (
        <Row name={layer.getVisualChannelDescription('size').measure} key="size" value={data.elevationValue || 'N/A'} />
      ) : null}
    </>
  );
};

interface LayerHoverInfoProps {
  fields: Field[];
  fieldsToShow: TooltipField[];
  layer: Layer;
  data: DataRow & {
    points: any[];
    elevationValue: string;
    colorValue: string;
  };
  primaryData: DataContainerInterface;
  compareType: CompareType | null;
}

const MapPopoverActions = styled.div`
  display: flex;
  flex-direction: row;

  ${Button} {
    text-transform: uppercase;
  }
`;
const LayerHoverInfoFactory = () => {
  return (props: LayerHoverInfoProps) => {
    const { data, layer, fieldsToShow, fields } = props;
    if (!data || !layer) {
      return null;
    }

    // const firstImageField = fieldsToShow.find((item) => {
    //
    //     const fieldIdx = fields.findIndex(f => f.name === field.name);
    //     if (fieldIdx < 0) {
    //         return null;
    //     }
    //     const field = fields[fieldIdx];
    //     const displayValue = getTooltipDisplayValue({item, field, data, fieldIdx});
    //     const displayName = field.displayName || field.name;
    //
    //     return displayValue;
    // })

    return (
      <div className="map-popover__layer-info">
        <StyledLayerName className="map-popover__layer-name">
          <Layers height="12px" />
          {props.layer.config.label}
        </StyledLayerName>
        <StyledTable className="properties">
          {props.layer.isAggregated ? <CellInfo {...props} /> : <EntryInfo {...props} />}
        </StyledTable>
        <MapPopoverActions className="map-popover__actions">
          <Button>Fermer</Button>
          <Button>Voir la fiche détaillée</Button>
        </MapPopoverActions>
      </div>
    );
  };
};

LayerHoverInfoFactory.deps = KeplerLayerHoverInfoFactory.deps;

export function replaceLayerHoverInfoFactory() {
  return [KeplerLayerHoverInfoFactory, LayerHoverInfoFactory];
}
