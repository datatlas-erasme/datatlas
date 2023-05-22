import {
  UserInterface,
  KeplerVersionedDataset,
  KeplerVersionedMapConfig,
  ProjectInterface,
  DatatlasSavedMapInterface,
  KeplerMapStyle,
} from '@datatlas/models';
import { ProjectDto } from '@datatlas/dtos';
import { KeplerGlSchema } from 'kepler.gl/schemas';
import { SavedMap, LoadedMap } from 'kepler.gl/src';

export class KeplerMapFactory {
  public static createFromProjectDto({
    datasets,
    config,
    version,
    owner,
    ...projectDto
  }: ProjectDto): DatatlasSavedMapInterface {
    return {
      datasets: KeplerMapFactory.getKeplerVersionedDatasetsFromProject({ datasets }),
      config: KeplerMapFactory.getKeplerVersionedMapConfigFromProject({ config, version }),
      info: {
        app: process.env.REACT_APP_NAME || 'Datatlas',
        ...projectDto,
        // There should be a ownerId in the projectId instead of an owner object.
        ownerId: owner,
      },
    };
  }

  public static createFromProject({
    config,
    createdAt,
    datasets,
    description,
    title,
    version,
    ownerId,
  }: Pick<ProjectInterface, 'config' | 'createdAt' | 'datasets' | 'description' | 'title' | 'version'> & {
    ownerId: UserInterface['id'];
  }): DatatlasSavedMapInterface {
    return {
      datasets: KeplerMapFactory.getKeplerVersionedDatasetsFromProject({ datasets }),
      config: KeplerMapFactory.getKeplerVersionedMapConfigFromProject({ config, version }),
      info: {
        app: process.env.REACT_APP_NAME || 'Datatlas',
        createdAt: createdAt,
        title,
        description,
        ownerId,
      },
    };
  }

  public static createSavedFromProject(project: ProjectInterface): DatatlasSavedMapInterface {
    return KeplerMapFactory.createFromProject({ ...project, ownerId: project.owner.id });
  }

  private static getKeplerVersionedMapConfigFromProject({
    config,
    version,
  }: Pick<ProjectInterface, 'config' | 'version'>): KeplerVersionedMapConfig {
    console.log('getKeplerVersionedMapConfigFromProject token', config.mapStyle);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new KeplerVersionedMapConfig(config, version);
  }

  private static getKeplerVersionedDatasetsFromProject({
    datasets,
  }: Pick<ProjectInterface, 'datasets'>): KeplerVersionedDataset[] {
    return datasets;
  }

  public static load(savedMap: SavedMap): LoadedMap {
    const loadedMap = KeplerGlSchema.load(savedMap);

    return {
      ...loadedMap,
      config: {
        ...loadedMap.config,
        mapStyle: KeplerMapStyle.enhance(loadedMap.config.mapStyle),
      },
    };
  }
}
