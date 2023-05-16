import React, { ButtonHTMLAttributes } from 'react';
import { FormattedMessage } from 'react-intl';
import { AddDataButtonFactory as KeplerAddDataButtonFactory } from 'kepler.gl/components';
import { Add } from 'kepler.gl/dist/components/common/icons';
import { Button } from '../../buttons';

interface AddDataButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isInactive?: boolean;
}
export function AddDataButtonFactory() {
  return ({ onClick, isInactive }: AddDataButtonProps) => (
    <Button className="add-data-button" onClick={onClick} isInactive={!isInactive}>
      <Add height="12px" />
      <FormattedMessage id={'layerManager.addData'} />
    </Button>
  );
}

AddDataButtonFactory.deps = KeplerAddDataButtonFactory.deps;

export function replaceAddDataButtonFactory() {
  return [KeplerAddDataButtonFactory, AddDataButtonFactory];
}
