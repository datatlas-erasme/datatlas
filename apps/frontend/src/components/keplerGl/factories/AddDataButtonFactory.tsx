import React from 'react';
import { FormattedMessage } from 'react-intl';
import { AddDataButtonFactory as KeplerAddDataButtonFactory } from 'kepler.gl/components';
import { Button } from '../../buttons';
import { Add } from 'kepler.gl/dist/components/common/icons';

export function AddDataButtonFactory() {
  const AddDataButton = ({ onClick, isInactive }) => (
    <Button className="add-data-button" onClick={onClick} isInactive={!isInactive} width="105px">
      <Add height="12px" />
      <FormattedMessage id={'layerManager.addData'} />
    </Button>
  );

  return AddDataButton;
}

AddDataButtonFactory.deps = KeplerAddDataButtonFactory.deps;

export function replaceAddDataButtonFactory() {
  return [KeplerAddDataButtonFactory, AddDataButtonFactory];
}
