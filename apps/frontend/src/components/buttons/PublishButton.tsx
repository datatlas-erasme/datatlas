/* eslint-disable react-hooks/rules-of-hooks */
import Button from './Button';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Filter } from 'kepler.gl';
import { KeplerGlProps } from 'kepler.gl/src/components/kepler-gl';
import { updateMapInfo } from '../../store/reducers/keplerGl';
import { useForward } from '../../hooks/useForward';
import { RootState } from '../../store/reducers';
import { selectIsDraft } from '../../store/selectors';

export const PublishButton = ({ readOnly }: KeplerGlProps) => {
  const forward = useForward();
  const { id } = useParams();

  if (!id) {
    return null;
  }

  const draft = useSelector<RootState, Filter[]>((state) => selectIsDraft(state, id));

  const handlePublish = () => {
    forward(updateMapInfo({ draft: !draft }));
  };

  if (readOnly) {
    return null;
  }

  return (
    <Button onClick={handlePublish}>
      {draft ? (
        <FormattedMessage id="map_control.publish" defaultMessage="Publish" />
      ) : (
        <FormattedMessage id="map_control.unpublish" defaultMessage="Unpublish" />
      )}
    </Button>
  );
};
