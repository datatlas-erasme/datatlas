import React from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Input } from '@kepler.gl/components';
import { MapInfoInterface } from '@datatlas/models';
import styled from 'styled-components';
import { FormError, FormRow, ServerErrorMessage, StyledLabel } from './';
import { StyledFormBtn } from '../buttons';
import { useForward } from '../../hooks';
import { handleServerError } from '../../utils';
import { updateMapInfo } from '../../store/reducers/keplerGl';

type EditTitleFormData = Pick<MapInfoInterface, 'title'>;

interface EditTitleFormProps {
  title?: string;
}

const InlineForm = styled.form``;

export function EditTitleForm({ title }: EditTitleFormProps) {
  const forward = useForward();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm<EditTitleFormData & { root?: { serverError?: Error } }>();

  const onSubmit = async () => {
    try {
      forward(updateMapInfo({ title: getValues().title }));
    } catch (e) {
      handleServerError<EditTitleFormData>(setError)(e);
    }
  };

  return (
    <InlineForm onSubmit={handleSubmit(onSubmit)}>
      <StyledLabel htmlFor="title" onSubmit={handleSubmit(onSubmit)}>
        <FormattedMessage id={'editTitleForm.title'} defaultMessage="Title" />
      </StyledLabel>
      <FormRow>
        <Input id="title" defaultValue={title || ''} {...register('title', { required: true })} />
        {errors.title && (
          <FormError>
            <FormattedMessage id={'editTitleForm.titleRequired'} defaultMessage="This field is required" />
          </FormError>
        )}
        <StyledFormBtn type="submit" small loading={false}>
          <FormattedMessage id={'editTitleForm.submit'} defaultMessage="Update" />
        </StyledFormBtn>
      </FormRow>
      <ServerErrorMessage error={errors?.root?.serverError} />
    </InlineForm>
  );
}
