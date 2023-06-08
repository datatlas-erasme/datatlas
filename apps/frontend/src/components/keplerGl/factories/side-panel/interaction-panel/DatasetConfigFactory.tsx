import React, { ComponentType } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { SidePanelSection, SBFlexboxNoMargin, Button } from 'kepler.gl/dist/components/common/styled-components';
import TooltipChickletFactory from 'kepler.gl/dist/components/side-panel/interaction-panel/tooltip-config/tooltip-chicklet';
import { TooltipConfigFactory as KeplerTooltipConfigFactory } from 'kepler.gl/components';
import { Datasets, TooltipField } from 'kepler.gl/src/reducers/vis-state-updaters';

export const ButtonWrapper = styled.div`
  display: inherit;
  padding: 0;

  .button.clear-all {
    background: transparent;
    color: ${({ theme }) => theme.subtextColor};
    margin: 0 0 0 8px;
    padding: 0;

    &:hover {
      color: ${({ theme }) => theme.textColor};
    }
  }
`;

export interface DatasetConfig {
  fieldsToShow: { [key: string]: TooltipField[] };
}

export interface DatasetConfigProps<C extends DatasetConfig> {
  config: C;
  onChange: (config: C) => void;
  dataset: Datasets[string];
}

export function DatasetConfigFactory<C extends DatasetConfig>(
  DatasetTag: ComponentType<any>,
  FieldSelector: ComponentType<any>
) {
  return ({ config, onChange, dataset }: DatasetConfigProps<C>) => {
    const dataId = dataset.id;
    return (
      <SidePanelSection key={dataId}>
        <SBFlexboxNoMargin>
          <DatasetTag dataset={dataset} />
          {Boolean(config.fieldsToShow[dataId].length) && (
            <ButtonWrapper>
              <Button
                className="clear-all"
                onClick={() => {
                  const newConfig = {
                    ...config,
                    fieldsToShow: {
                      ...config.fieldsToShow,
                      [dataId]: [],
                    },
                  };
                  onChange(newConfig);
                }}
                width="54px"
                secondary
              >
                <FormattedMessage id="fieldSelector.clearAll" defaultMessage="Clear all" />
              </Button>
            </ButtonWrapper>
          )}
        </SBFlexboxNoMargin>
        <FieldSelector
          fields={dataset.fields}
          value={config.fieldsToShow[dataId]}
          onSelect={(selected) => {
            const newConfig = {
              ...config,
              fieldsToShow: {
                ...config.fieldsToShow,
                [dataId]: selected.map(
                  (f) =>
                    config.fieldsToShow[dataId].find((tooltipField) => tooltipField.name === f.name) || {
                      name: f.name,
                      // default initial tooltip is null
                      format: null,
                    }
                ),
              },
            };
            onChange(newConfig);
          }}
          closeOnSelect={false}
          multiSelect
          inputTheme="secondary"
          CustomChickletComponent={TooltipChickletFactory(dataId, config, onChange, dataset.fields)}
        />
      </SidePanelSection>
    );
  };
}

DatasetConfigFactory.deps = KeplerTooltipConfigFactory.deps;
