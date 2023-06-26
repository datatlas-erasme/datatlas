import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import InfoHelperFactory from 'kepler.gl/dist/components/common/info-helper';

export function ConfigLabelFactory(InfoHelper) {
  const ConfigLabelContainer = styled.div`
    border-left: ${(props) => props.theme.layerConfigGroupLabelBorderLeft} solid ${(props) => props.theme.labelColor};
    line-height: 12px;
    margin-left: ${(props) => props.theme.layerConfigGroupLabelMargin};
    padding-left: ${(props) => props.theme.layerConfigGroupLabelPadding};

    display: flex;
    align-items: center;

    span {
      color: ${(props) => props.theme.textColor};
      font-weight: 500;
      letter-spacing: 0.2px;
      text-transform: capitalize;
      margin-left: ${(props) => props.theme.layerConfigGroupLabelLabelMargin};
      font-size: ${(props) => props.theme.layerConfigGroupLabelLabelFontSize};
    }
  `;

  return ({ label, description, children }) => (
    <ConfigLabelContainer className="config__label">
      <span>
        <FormattedMessage id={label} defaultMessage={label} />
      </span>
      {description && <InfoHelper description={description} id={label} />}
    </ConfigLabelContainer>
  );
}

ConfigLabelFactory.deps = [InfoHelperFactory];
