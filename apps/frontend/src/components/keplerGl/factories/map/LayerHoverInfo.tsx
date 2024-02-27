/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useMemo} from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import {Layers} from '@kepler.gl/components/dist/common/icons';
import {Factory} from '@kepler.gl/components/dist/injector';
import {getTooltipDisplayDeltaValue} from '@kepler.gl/reducers';
import {StyledLayerName} from '@kepler.gl/components/dist/map/layer-hover-info';
import {LayerHoverInfoFactory as KeplerLayerHoverInfoFactory} from '@kepler.gl/components';
import {DataRow} from '@kepler.gl/utils';
import {TooltipField} from '@kepler.gl/types';
import {Button, OutlineButton} from '../../../buttons';
import {ExternalLink} from '../../../ExternalLink';
import {isImageURL, humanize} from '../../../../utils';
import {useOnKeyEffect} from '../../../../hooks/useOnKeyEffect';
import {KeyEvent} from '@kepler.gl/constants';
import {
  AggregationLayerHoverData,
  getTooltipDisplayValue,
  LayerHoverProp
} from '@kepler.gl/reducers';

export const MapPopoverContent = styled.div`
  & .row__delta-value {
    text-align: right;

    &.positive {
      color: ${props => props.theme.primaryBtnBgd};
    }

    &.negative {
      color: ${props => props.theme.negativeBtnActBgd};
    }
  }
`;

interface RowProps extends Omit<ExpandableProps, 'setExpanded'> {
  name?: string;
  value: number | string;
  deltaValue?: number | string | null;
  url?: string;
  aggregated?: boolean;
}

export const Row = ({name = '', value, deltaValue, url, aggregated, setExpandable}: RowProps) => {
  // Set 'url' to 'value' if it looks like a url
  if (!url && value && typeof value === 'string' && value.match(/^http/)) {
    url = value;
  }

  const className = classNames(['row', !value && 'empty', aggregated && 'aggregated']);
  const containerProps = {
    className,
    key: name
  };

  // @todo We could also attempt to load the URL and see what's the content type.
  const asImg = /<img>/.test(name) || isImageURL(value as string);

  useEffect(() => {
    if (asImg) {
      setExpandable(true);
    }
  }, [asImg, setExpandable]);

  if (asImg) {
    return (
      <div {...containerProps} className={classNames([className, 'image-container'])}>
        <ExternalLink href={url}>
          <img src={value as string} alt={name} />
        </ExternalLink>
      </div>
    );
  }

  return (
    <dl {...containerProps}>
      <dt className="row__name">{humanize(name)}</dt>
      <dd className="row__value">
        <ExternalLink href={url}>{value}</ExternalLink>
      </dd>
      {deltaValue && (
        <dd
          className={`row__delta-value ${
            deltaValue.toString().charAt(0) === '+' ? 'positive' : 'negative'
          }`}
        >
          {deltaValue}
        </dd>
      )}
    </dl>
  );
};

type EntryInfoProps = Omit<LayerHoverInfoProps, 'onClose'> & {data: DataRow; primaryData: DataRow};

const EntryInfo = ({
  fieldsToShow,
  fields,
  data,
  primaryData,
  compareType,
  expanded,
  setExpandable
}: EntryInfoProps) => (
  <div className="entry-info">
    {fieldsToShow.map(item => (
      <EntryInfoRow
        key={item.name}
        item={item}
        fields={fields}
        data={data}
        primaryData={primaryData}
        compareType={compareType}
        expanded={expanded}
        setExpandable={setExpandable}
      />
    ))}
  </div>
);

interface EntryInfoRowProps
  extends Omit<LayerHoverInfoProps, 'fieldsToShow' | 'layer' | 'setExpanded' | 'onClose' | 'data'> {
  data: DataRow;
  primaryData: DataRow;
  item: TooltipField;
}

const EntryInfoRow = ({
  item,
  fields,
  data,
  primaryData,
  compareType,
  expanded,
  setExpandable
}: EntryInfoRowProps) => {
  const fieldIdx = fields.findIndex(f => f.name === item.name);
  if (fieldIdx < 0) {
    return null;
  }
  const field = fields[fieldIdx];
  const value = data.valueAt(fieldIdx);
  const displayValue = getTooltipDisplayValue({item, field, value});

  const displayDeltaValue = getTooltipDisplayDeltaValue({
    field,
    data,
    fieldIdx,
    primaryData,
    compareType: compareType || ''
  });

  return (
    <Row
      name={field.displayName || field.name}
      value={displayValue}
      deltaValue={displayDeltaValue}
      expanded={expanded}
      setExpandable={setExpandable}
    />
  );
};

// TODO: supporting comparative value for aggregated cells as well
type CellInfoProps = Omit<LayerHoverInfoProps, 'setExpanded' | 'data'> & {
  data: AggregationLayerHoverData;
};

const CellInfo = ({data, fieldsToShow, layer, expanded, setExpandable}: CellInfoProps) => {
  const {colorField, sizeField} = layer.config as any;

  const colorValue = useMemo(() => {
    if (colorField && layer.visualChannels.color) {
      const item = fieldsToShow.find(field => field.name === colorField.name);
      return getTooltipDisplayValue({item, field: colorField, value: data.colorValue});
    }
    return null;
  }, [fieldsToShow, colorField, layer, data.colorValue]);

  const elevationValue = useMemo(() => {
    if (sizeField && layer.visualChannels.size) {
      const item = fieldsToShow.find(field => field.name === sizeField.name);
      return getTooltipDisplayValue({item, field: sizeField, value: data.elevationValue});
    }
    return null;
  }, [fieldsToShow, sizeField, layer, data.elevationValue]);

  const colorMeasure = layer.getVisualChannelDescription('color').measure;
  const sizeMeasure = layer.getVisualChannelDescription('size').measure;
  return (
    <>
      <Row
        name={'total points'}
        key="count"
        value={String(data.points && data.points.length)}
        setExpandable={setExpandable}
        aggregated
      />
      {colorField && layer.visualChannels.color && colorMeasure ? (
        <Row
          name={colorMeasure}
          key="color"
          value={colorValue || 'N/A'}
          setExpandable={setExpandable}
        />
      ) : null}
      {sizeField && layer.visualChannels.size && sizeMeasure ? (
        <Row
          name={sizeMeasure}
          key="size"
          value={elevationValue || 'N/A'}
          setExpandable={setExpandable}
        />
      ) : null}
    </>
  );
};

const MapPopoverActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
`;

const Toolbar = styled.div``;

interface ExpandableProps {
  expanded?: boolean;
  setExpanded: (expanded: boolean) => void;
  setExpandable: (expanded: boolean) => void;
}

const LayerHoverInfoContainer = styled.div<Pick<LayerHoverInfoProps, 'layer'>>`
  .map-popover__layer-name {
    svg {
      fill: ${({layer}) => `rgb(${layer.config.color.join(',')})`};
    }
  }
`;

const LayerHoverInfoFactory = () => {
  return (props: LayerHoverInfoProps) => {
    const {data, layer, expanded, setExpanded} = props;
    if (!data || !layer) {
      return null;
    }

    useOnKeyEffect<boolean>(KeyEvent.DOM_VK_ESCAPE, setExpanded, false);

    return (
      <LayerHoverInfoContainer
        className={classNames(['map-popover__layer-info', expanded && 'expanded'])}
        layer={layer}
      >
        <Toolbar className="map-popover__topbar">
          <StyledLayerName className="map-popover__layer-name">
            <Layers height="16px" style={{fill: layer.config.color.toString()}} />
            {props.layer.config.label}
          </StyledLayerName>
          <Button onClick={() => setExpanded(false)}>×</Button>
        </Toolbar>
        <MapPopoverContent className="map-popover__content">
          {props.layer.isAggregated ? (
            <CellInfo {...props} data={data as AggregationLayerHoverData} expanded={expanded} />
          ) : (
            <EntryInfo
              {...props}
              data={data as DataRow}
              primaryData={props.primaryData as DataRow}
              expanded={expanded}
            />
          )}
        </MapPopoverContent>
        {!props.layer.isAggregated && (
          <MapPopoverActions className="map-popover__actions">
            <OutlineButton onClick={() => setExpanded(true)}>Voir la fiche détaillée</OutlineButton>
          </MapPopoverActions>
        )}
      </LayerHoverInfoContainer>
    );
  };
};

export type LayerHoverInfoProps = LayerHoverProp & ExpandableProps & {onClose: () => void};

LayerHoverInfoFactory.deps = [];

export function replaceLayerHoverInfoFactory(): [Factory, Factory] {
  // @ts-ignore
  return [KeplerLayerHoverInfoFactory, LayerHoverInfoFactory];
}
