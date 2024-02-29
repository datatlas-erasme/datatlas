/* eslint-disable react-hooks/rules-of-hooks */
import Button from './Button';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { updateMapInfo } from '../../store/reducers/keplerGl';
import { useForward } from '../../hooks';
import { useAppSelector } from '../../store/reducers';
import { selectIsDraft } from '../../store/selectors';
import { KeplerGLBasicProps } from '../keplerGl/factories';

export const PublishButton = ({ readOnly }: KeplerGLBasicProps) => {
  const { id } = useParams<keyof { id: string }>();
  if (!id) {
    return null;
  }

  const forward = useForward();
  const draft = useAppSelector((state) => selectIsDraft(state, id));

  const handlePublish = () => {
    forward(updateMapInfo({ draft: !draft }));
  };

  if (readOnly || typeof draft === 'undefined') {
    return null;
  }

  return (
    <Button onClick={handlePublish} primary>
      {draft ? (
        <FormattedMessage id="map_control.publish" defaultMessage="Publish" />
      ) : (
        <FormattedMessage id="map_control.unpublish" defaultMessage="Unpublish" />
      )}
    </Button>
  );
};
