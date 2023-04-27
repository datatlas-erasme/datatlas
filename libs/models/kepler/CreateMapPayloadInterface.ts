import { BaseMapStyle } from 'kepler.gl/reducers';
import { ProjectInterface } from '../ProjectInterface';
import { MapInfoInterface } from '../MapInfoInterface';

export interface CreateMapPayloadInterface {
  title: MapInfoInterface['title'];
  mapStyleId: BaseMapStyle['id'];
  template?: ProjectInterface['id'];
}
