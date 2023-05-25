import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Input } from 'kepler.gl/dist/components/common/styled-components';
import { KeplerMapStyle } from '@datatlas/models';
import { StyledFormBtn } from '../buttons';
import { FormError, StyledLabel } from '../forms';
import { useCreateProjectMutation } from '../../store/api';
import { CreateProjectFormData } from '../../models';

export function StartNewProjectForm() {
  const [createProject, { isLoading, isSuccess, error, isError, data }] = useCreateProjectMutation();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<CreateProjectFormData>();
  useEffect(() => {
    if (isSuccess && data) {
      navigate(`/projects/${data.id}`);
    }
    if (isError) {
      console.error('formError', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(createProject)}>
      <StyledLabel htmlFor={'title'}>
        1.
        <FormattedMessage id={'createProjectForm.projectName'} defaultMessage={'Entrez le nom du projet'} />
      </StyledLabel>
      {/* register your input into the hook by invoking the "register" function */}
      <Input id="title" defaultValue="" {...register('title', { required: true })} />
      {errors.title && (
        <FormError>
          <FormattedMessage id={'createProjectForm.titleRequired'} defaultMessage="This field is required" />
        </FormError>
      )}
      <StyledLabel htmlFor={'selectMap'}>
        2.
        <FormattedMessage id={'createProjectForm.mapStyle'} defaultMessage={'Sélectionnez un fond de carte'} />
      </StyledLabel>
      <select {...register('mapStyleId')}>
        {KeplerMapStyle.DEFAULT_MAP_STYLES.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
      <StyledFormBtn loading={isLoading}>
        <FormattedMessage id={'createProjectForm.submit'} defaultMessage="Créer" />
      </StyledFormBtn>
    </form>
  );
}
