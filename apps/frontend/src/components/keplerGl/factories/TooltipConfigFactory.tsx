import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { SidePanelSection, SBFlexboxNoMargin, Button } from 'kepler.gl/dist/components/common/styled-components';
import TooltipChickletFactory from 'kepler.gl/dist/components/side-panel/interaction-panel/tooltip-config/tooltip-chicklet';
import { TooltipConfigFactory as KeplerTooltipConfigFactory } from 'kepler.gl/components';

const TooltipConfigWrapper = styled.div`
  .item-selector > div > div {
    overflow: visible;
  }
`;

const ButtonWrapper = styled.div`
  display: inherit;
  padding: 0;

  .button.clear-all {
    background: transparent;
    color: ${(props) => props.theme.subtextColor};
    margin: 0 0 0 8px;
    padding: 0;

    &:hover {
      color: ${(props) => props.theme.textColor};
    }
  }
`;

TooltipConfigFactory.deps = KeplerTooltipConfigFactory.deps;
function TooltipConfigFactory(DatasetTag, FieldSelector) {
  const DatasetTooltipConfig = ({ config, onChange, dataset }) => {
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
                <FormattedMessage id="fieldSelector.clearAll" />
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

  return ({ config, datasets, onChange }) => {
    return (
      <TooltipConfigWrapper>
        {Object.keys(config.fieldsToShow).map((dataId) => (
          <DatasetTooltipConfig key={dataId} config={config} onChange={onChange} dataset={datasets[dataId]} />
        ))}
      </TooltipConfigWrapper>
    );
  };
}

export function replaceTooltipConfig() {
  return [KeplerTooltipConfigFactory, TooltipConfigFactory];
}
