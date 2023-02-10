import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { CreateMapPayloadInterface, DEFAULT_MAP_STYLES } from '@datatlas/models';
import { Input } from 'kepler.gl/dist/components/common/styled-components';

export interface StartNewProjectFormProps {
  onSubmit: SubmitHandler<StartNewProjectFormData>;
}
export type StartNewProjectFormData = CreateMapPayloadInterface;

export function StartNewProjectForm({ onSubmit }: StartNewProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StartNewProjectFormData>();

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor={'title'}>
        1.
        <FormattedMessage defaultMessage={'Entrez le nom du projet'} />
      </label>
      {/* register your input into the hook by invoking the "register" function */}
      <Input id="title" defaultValue="" {...register('title', { required: true })} />
      {errors.title && <FormattedMessage defaultMessage="This field is required" />}
      <label htmlFor={'selectMap'}>
        2.
        <FormattedMessage defaultMessage={'Sélectionnez un fond de carte'} />
      </label>
      <select {...register('mapStyleId')}>
        {DEFAULT_MAP_STYLES.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>

      <div>
        <label htmlFor={'templateId'}>
          3.
          <FormattedMessage defaultMessage={'Choisissez un modèle'} />
        </label>
        <div>
          <h3>Je suis un template à selectionner</h3>
        </div>
      </div>
      <input type="submit" />
    </form>
  );
}
