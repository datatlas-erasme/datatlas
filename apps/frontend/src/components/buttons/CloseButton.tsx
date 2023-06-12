import React from 'react';
import { Delete } from 'kepler.gl/dist/components/common/icons';

interface CloseButtonInterface {
  onClose: () => void;
}
export const CloseButton = ({ onClose }: CloseButtonInterface) => {
  return (
    <button className={'closeBtn'} onClick={onClose}>
      <Delete />
    </button>
  );
};
