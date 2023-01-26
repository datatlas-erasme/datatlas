import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

export interface StartNewProjectFormProps {
  onSubmit: SubmitHandler<StartNewProjectFormData>;
}
export interface StartNewProjectFormData {
  name: string;
  mapStyle: string;
  template?: string;
}

export function StartNewProjectForm({ onSubmit }: StartNewProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StartNewProjectFormData>();

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="" {...register('name', { required: true })} />
      {errors.name && <FormattedMessage defaultMessage="This field is required" />}

      <select {...register('mapStyle')}>
        <option value="satellite">satellite</option>
        <option value="topo">topo</option>
      </select>

      <input type="submit" />
    </form>
  );
}
