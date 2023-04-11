import React from 'react';
import { SidePanelSection, PanelLabel } from 'kepler.gl/dist/components/common/styled-components';
import ItemSelector from 'kepler.gl/dist/components/common/item-selector/item-selector';
import { FormattedMessage } from 'react-intl';

export const AggregationTypeSelector = ({ layer, channel, onChange }) => {
  const { field, aggregation, key } = channel;
  const selectedField = layer.config[field];
  const { visConfig } = layer.config;

  // aggregation should only be selectable when field is selected
  const aggregationOptions = layer.getAggregationOptions(key);

  return (
    <SidePanelSection>
      <PanelLabel>
        <FormattedMessage id={'layer.aggregateBy'} values={{ field: selectedField.name }} />
      </PanelLabel>
      <ItemSelector
        selectedItems={visConfig[aggregation]}
        options={aggregationOptions}
        multiSelect={false}
        searchable={false}
        onChange={(value) =>
          onChange(
            {
              visConfig: {
                ...layer.config.visConfig,
                [aggregation]: value,
              },
            },
            channel.key
          )
        }
      />
    </SidePanelSection>
  );
};
/* eslint-enable max-params */
