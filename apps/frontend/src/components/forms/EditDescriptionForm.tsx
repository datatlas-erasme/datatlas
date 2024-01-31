import React from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { MapInfoInterface } from '@datatlas/models';
import styled from 'styled-components';
import { FormError, ServerErrorMessage, StyledLabel } from './';
import { StyledFormBtn } from '../buttons';
import { useForward } from '../../hooks';
import { handleServerError } from '../../utils';
import { updateMapInfo } from '../../store/reducers/keplerGl';
import { MarkdownTextArea } from './inputs/MarkdownTextArea';

type EditDescriptionFormData = Pick<MapInfoInterface, 'description'>;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  ${StyledFormBtn} {
    align-self: end;
  }
`;

interface EditDescriptionFormProps {
  description?: string;
}

export function EditDescriptionForm({ description }: EditDescriptionFormProps) {
  const forward = useForward();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm<EditDescriptionFormData & { root?: { serverError?: Error } }>();

  const onSubmit = async () => {
    try {
      forward(updateMapInfo({ description: getValues().description }));
    } catch (e) {
      handleServerError<EditDescriptionFormData>(setError)(e);
    }
  };

  // https://docs.github.com/fr/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <StyledLabel htmlFor="description">
        <FormattedMessage id={'editDescriptionForm.description'} defaultMessage="Description" />
      </StyledLabel>
      <MarkdownTextArea
        id="description"
        defaultValue={description || ''}
        readonly={!description}
        rows={8}
        {...register('description', { required: true })}
      />
      {errors.description && (
        <FormError>
          <FormattedMessage id={'editDescriptionForm.descriptionRequired'} defaultMessage="This field is required" />
        </FormError>
      )}
      <StyledFormBtn type="submit" small loading={false}>
        <FormattedMessage id={'editDescriptionForm.submit'} defaultMessage="Update" />
      </StyledFormBtn>
      <ServerErrorMessage error={errors?.root?.serverError} />
    </FormContainer>
  );
}
