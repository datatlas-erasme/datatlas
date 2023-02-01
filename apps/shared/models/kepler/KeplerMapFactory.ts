import { KeplerVersionedDataset } from './KeplerVersionedDataset';
import { KeplerVersionedMapConfig } from './KeplerVersionedMapConfig';
import { KeplerMapConfig } from './KeplerMapConfig';
import { KeplerMapStyle } from './KeplerMapStyle';
import { ProjectInterface } from '../ProjectInterface';
import { CreateMapPayloadInterface } from './CreateMapPayloadInterface';
import { MapInfoInterface } from '../MapInfoInterface';
import { DatatlasSavedMapInterface } from '../DatatlasSavedMapInterface';
import { UserInterface } from '../UserInterface';

export class KeplerMapFactory {
  public static createFromFormData(
    { title, mapStyleId }: CreateMapPayloadInterface,
    ownerId: UserInterface['id']
  ): DatatlasSavedMapInterface {
    const info: MapInfoInterface = {
      app: process.env.REACT_APP_NAME || 'Datatlas',
      title,
      description: '',
      createdAt: new Date(),
      ownerId,
    };

    return {
      datasets: [],
      config: {
        version: 'v1',
        config: new KeplerMapConfig({
          mapStyle: new KeplerMapStyle(mapStyleId),
        }),
      },
      info,
    };
  }

  public static createFromProject({
    config,
    createdAt,
    datasets,
    description,
    title,
    version,
    owner,
  }: Pick<
    ProjectInterface,
    'config' | 'createdAt' | 'datasets' | 'description' | 'title' | 'version' | 'owner'
  >): DatatlasSavedMapInterface {
    return {
      datasets: KeplerMapFactory.getKeplerVersionedDatasetsFromProject({ datasets }),
      config: KeplerMapFactory.getKeplerVersionedMapConfigFromProject({ config, version }),
      info: {
        app: process.env.REACT_APP_NAME || 'Datatlas',
        createdAt: createdAt,
        title,
        description,
        ownerId: owner.id,
      },
    };
  }

  private static getKeplerVersionedMapConfigFromProject({
    config,
    version,
  }: Pick<ProjectInterface, 'config' | 'version'>): KeplerVersionedMapConfig {
    return new KeplerVersionedMapConfig(config, version);
  }

  private static getKeplerVersionedDatasetsFromProject({
    datasets,
  }: Pick<ProjectInterface, 'datasets'>): KeplerVersionedDataset[] {
    return datasets;
  }
}
