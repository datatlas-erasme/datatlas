import Button from './Button';
import React from 'react';
import { KeplerGlProps } from 'kepler.gl/src/components/kepler-gl';
import { updateMapInfo } from '../../store/reducers/keplerGl';
import { useForward } from '../../hooks/useForward';

export const PublishButton = ({ readOnly }: KeplerGlProps) => {
  const forward = useForward();
  const handlePublish = () => {
    forward(updateMapInfo({ draft: false }));
  };

  if (readOnly) {
    return null;
  }

  return <Button onClick={handlePublish}>Publish</Button>;
};
