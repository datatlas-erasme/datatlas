/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect} from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import {Layers} from '@kepler.gl/components/dist/common/icons';
import {getTooltipDisplayDeltaValue, getTooltipDisplayValue} from '@kepler.gl/reducers';
import {StyledLayerName} from '@kepler.gl/components/dist/map/layer-hover-info';
import {LayerHoverInfoFactory as KeplerLayerHoverInfoFactory} from '@kepler.gl/components';
import {DataContainerInterface, DataRow} from '@kepler.gl/utils';
import {CompareType, Field, TooltipField} from '@kepler.gl/types';
import {Layer, LayerBaseConfig, LayerColorConfig, LayerSizeConfig} from '@kepler.gl/layers';
import {Button, OutlineButton} from '../../../buttons';
import {ExternalLink} from '../../../ExternalLink';
import {isImageURL, humanize} from '../../../../utils';
import {useOnKeyEffect} from '../../../../hooks/useOnKeyEffect';
import {KeyEvent} from '@kepler.gl/constants';

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

const EntryInfo = ({
  fieldsToShow,
  fields,
  data,
  primaryData,
  compareType,
  expanded,
  setExpandable
}: Omit<LayerHoverInfoProps, 'onClose'>) => (
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
  extends Omit<LayerHoverInfoProps, 'fieldsToShow' | 'layer' | 'setExpanded' | 'onClose'> {
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
  // @ts-ignore
  const displayValue = getTooltipDisplayValue({item, field, data, fieldIdx});

  const displayDeltaValue = getTooltipDisplayDeltaValue({
    item,
    field,
    data,
    fieldIdx,
    // @ts-ignore
    primaryData,
    compareType
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
const CellInfo = ({
  data,
  layer,
  expanded,
  setExpandable
}: Omit<LayerHoverInfoProps, 'setExpanded'>) => {
  const {colorField, sizeField} = layer.config;

  return (
    <>
      <Row
        name={'total points'}
        key="count"
        value={data.points && data.points.length}
        setExpandable={setExpandable}
        aggregated
      />
      {colorField && layer.visualChannels.color ? (
        <Row
          name={layer.getVisualChannelDescription('color').measure}
          key="color"
          value={data.colorValue || 'N/A'}
          setExpandable={setExpandable}
        />
      ) : null}
      {sizeField && layer.visualChannels.size ? (
        <Row
          name={layer.getVisualChannelDescription('size').measure}
          key="size"
          value={data.elevationValue || 'N/A'}
          setExpandable={setExpandable}
        />
      ) : null}
    </>
  );
};

export interface LayerHoverInfoProps extends ExpandableProps {
  fields: Field[];
  fieldsToShow: TooltipField[];
  layer: Layer & {config: LayerBaseConfig & Partial<LayerColorConfig & LayerSizeConfig>};
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
            <CellInfo {...props} expanded={expanded} />
          ) : (
            <EntryInfo {...props} expanded={expanded} />
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

LayerHoverInfoFactory.deps = [];

export function replaceLayerHoverInfoFactory() {
  return [KeplerLayerHoverInfoFactory, LayerHoverInfoFactory];
}
