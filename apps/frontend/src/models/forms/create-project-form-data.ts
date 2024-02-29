import { CreateProjectDto } from '@datatlas/dtos';
import { BaseMapStyle } from '@kepler.gl/types';
import { ProjectInterface } from '@datatlas/models';

export interface CreateProjectFormData extends CreateProjectDto {
  mapStyleId: BaseMapStyle['id'];
  template?: ProjectInterface['id'];
}
