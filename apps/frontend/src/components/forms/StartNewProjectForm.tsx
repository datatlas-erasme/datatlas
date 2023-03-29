import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, WrappedComponentProps } from 'react-intl';
import { CreateMapPayloadInterface, DEFAULT_MAP_STYLES } from '@datatlas/models';
import { Input } from 'kepler.gl/dist/components/common/styled-components';
import { StyledFormBtn } from '../buttons';
import { StyledLabel } from '../forms';

export interface StartNewProjectFormProps extends WrappedComponentProps {
  onSubmit: SubmitHandler<StartNewProjectFormData>;
}
export type StartNewProjectFormData = CreateMapPayloadInterface;

export function StartNewProjectForm({ onSubmit, intl }: StartNewProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StartNewProjectFormData>();

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledLabel htmlFor={'title'}>
        1.
        <FormattedMessage id={'createProjectForm.projectName'} defaultMessage={'Entrez le nom du projet'} />
      </StyledLabel>
      {/* register your input into the hook by invoking the "register" function */}
      <Input id="title" defaultValue="" {...register('title', { required: true })} />
      {errors.title && (
        <FormattedMessage id={'createProjectForm.titleRequired'} defaultMessage="This field is required" />
      )}
      <StyledLabel htmlFor={'selectMap'}>
        2.
        <FormattedMessage id={'createProjectForm.mapStyle'} defaultMessage={'Sélectionnez un fond de carte'} />
      </StyledLabel>
      <select {...register('mapStyleId')}>
        {DEFAULT_MAP_STYLES.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
      <StyledFormBtn
        type="submit"
        value={intl.formatMessage({ id: 'createProjectForm.submit', defaultMessage: 'Créer' })}
      />
    </form>
  );
}
