import {
  KeplerVersionedDataset,
  KeplerVersionedMapConfig,
  ProjectInterface,
  DatatlasSavedMapInterface,
  KeplerMapStyle,
  NormalizedProjectInterface,
  Project,
} from '@datatlas/models';
import { ProjectDto } from '@datatlas/dtos';
import { SavedMap, LoadedMap } from 'kepler.gl/src';
import { KeplerGlSchema } from 'kepler.gl/schemas';
import { schemaManager } from './schema-manager';

export class KeplerMapFactory {
  schemaManager: KeplerGlSchema;

  constructor(schemaManager: KeplerGlSchema) {
    this.schemaManager = schemaManager;
  }

  public static createFromProjectDto({
    datasets,
    config,
    version,
    ...projectDto
  }: ProjectDto): DatatlasSavedMapInterface {
    return {
      datasets: KeplerMapFactory.getKeplerVersionedDatasetsFromProject({ datasets }),
      config: KeplerMapFactory.getKeplerVersionedMapConfigFromProject({ config, version }),
      info: {
        app: process.env.REACT_APP_NAME || 'Datatlas',
        ...projectDto,
      },
    };
  }

  public static createFromProject(project: ProjectInterface): DatatlasSavedMapInterface {
    return KeplerMapFactory.createFromNormalizedProject(Project.normalize(project));
  }

  public static createFromNormalizedProject({
    datasets,
    config,
    version,
    ...props
  }: NormalizedProjectInterface): DatatlasSavedMapInterface {
    return {
      datasets: KeplerMapFactory.getKeplerVersionedDatasetsFromProject({ datasets }),
      config: KeplerMapFactory.getKeplerVersionedMapConfigFromProject({ config, version }),
      info: {
        app: process.env.REACT_APP_NAME || 'Datatlas',
        ...props,
      },
    };
  }

  public static createSavedFromProject(project: ProjectInterface): DatatlasSavedMapInterface {
    return KeplerMapFactory.createFromProject(project);
  }

  private static getKeplerVersionedMapConfigFromProject({
    config,
    version,
  }: Pick<ProjectInterface, 'config' | 'version'>): KeplerVersionedMapConfig {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new KeplerVersionedMapConfig(config, version);
  }

  private static getKeplerVersionedDatasetsFromProject({
    datasets,
  }: Pick<ProjectInterface, 'datasets'>): KeplerVersionedDataset[] {
    return datasets;
  }

  public load(savedMap: SavedMap): LoadedMap {
    const loadedMap = this.schemaManager.load(savedMap);

    return {
      ...loadedMap,
      config: {
        ...loadedMap.config,
        mapStyle: KeplerMapStyle.enhance(loadedMap.config.mapStyle),
      },
    };
  }

  public save(keplerGlState): DatatlasSavedMapInterface {
    return this.schemaManager.save(keplerGlState);
  }
}

export const keplerMapFactory = new KeplerMapFactory(schemaManager);
