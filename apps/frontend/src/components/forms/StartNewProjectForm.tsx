import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { startNewProject } from '../../store/reducers/app/drafts';
import ProjectCard from '../card/ProjectCard';
import { Button } from '../buttons';

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
      <label htmlFor={'nameProject'}>
        1.
        <FormattedMessage defaultMessage={'Entrez le nom du projet'} />
      </label>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="" {...register('name', { required: true })} />
      {errors.name && <FormattedMessage defaultMessage="This field is required" />}
      <label htmlFor={'selectMap'}>
        2.
        <FormattedMessage defaultMessage={'Sélectionnez un fond de carte'} />
      </label>
      <select {...register('mapStyle')}>
        <option value="satellite">satellite</option>
        <option value="topo">topo</option>
      </select>

      <div>
        <label htmlFor={'selectModel'}>
          3.
          <FormattedMessage defaultMessage={'Choisissez un modèle'} />
        </label>
        <ProjectCard id={'idCard1'} name={'default'} draft={true} datasets={[]} ownerId={1} />
      </div>
      <input type="submit" />
    </form>
  );
}
