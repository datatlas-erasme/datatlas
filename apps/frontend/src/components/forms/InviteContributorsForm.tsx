import React from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { LoadingProjectInterface, PublicUserInterface } from '@datatlas/models';
import { StyledLabel } from './StyledLabel';
import { InviteContributorFormData } from '../../models';
import { useForward } from '../../hooks';
import { ContributorsSelector } from './inputs';
import { updateMapInfo } from '../../store/reducers/keplerGl';

interface InviteContributorsFormProps {
  owner: LoadingProjectInterface['owner'];
  contributors: PublicUserInterface[];
  users: PublicUserInterface[];
}

export function InviteContributorsForm({ owner, contributors, users }: InviteContributorsFormProps) {
  const forward = useForward();
  const { register } = useForm<InviteContributorFormData>();

  const updateProjectContributors = (publicUsers: readonly PublicUserInterface[]) => {
    forward(updateMapInfo({ contributorsIds: publicUsers.map(({ id }) => id) }));
  };

  return (
    <form>
      <StyledLabel htmlFor="contributors">
        <FormattedMessage id={'project.update.contributors'} defaultMessage="Contributors" />
      </StyledLabel>
      <ContributorsSelector
        contributors={contributors}
        users={users}
        handleChange={updateProjectContributors}
        {...register('contributors')}
      />
    </form>
  );
}
