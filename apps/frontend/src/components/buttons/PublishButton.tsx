import Button from './Button';
import React from 'react';
import { updateMapInfo } from '../../store/reducers/keplerGl';
import { useForward } from '../../hooks/useForward';

export const PublishButton = () => {
  const forward = useForward();
  const handlePublish = () => {
    forward(updateMapInfo({ draft: false }));
  };

  return <Button onClick={handlePublish}>Publish</Button>;
};
