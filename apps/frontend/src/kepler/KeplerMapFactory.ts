import {
  KeplerVersionedDataset,
  ProjectInterface,
  NormalizedProjectInterface,
  Project,
  VersionedSavedMapConfig,
  SavedMapStyle,
  SavedMap,
  DatatlasGlState,
} from '@datatlas/models';
import { ProjectDto } from '@datatlas/dtos';
import { LoadedMap } from '@kepler.gl/types';
import { KeplerGLSchema } from '@kepler.gl/schemas/dist/schema-manager';
import { schemaManager } from './schema-manager';

export class KeplerMapFactory {
  schemaManager: KeplerGLSchema;

  constructor(schemaManager: KeplerGLSchema) {
    this.schemaManager = schemaManager;
  }

  public static createFromProjectDto({ datasets, config, version, ...projectDto }: ProjectDto): SavedMap {
    return {
      datasets: KeplerMapFactory.getKeplerVersionedDatasetsFromProject({ datasets }),
      config: KeplerMapFactory.getKeplerVersionedMapConfigFromProject({ config, version }),
      info: {
        app: process.env.REACT_APP_NAME || 'Datatlas',
        ...projectDto,
      },
    };
  }

  public static createFromProject(project: ProjectInterface): SavedMap {
    return KeplerMapFactory.createFromNormalizedProject(Project.normalize(project));
  }

  public static createFromNormalizedProject({
    datasets,
    config,
    version,
    ...props
  }: NormalizedProjectInterface): SavedMap {
    return {
      datasets: KeplerMapFactory.getKeplerVersionedDatasetsFromProject({ datasets }),
      config: KeplerMapFactory.getKeplerVersionedMapConfigFromProject({ config, version }),
      info: {
        app: process.env.REACT_APP_NAME || 'Datatlas',
        ...props,
      },
    };
  }

  public static createSavedFromProject(project: ProjectInterface): SavedMap {
    return KeplerMapFactory.createFromProject(project);
  }

  private static getKeplerVersionedMapConfigFromProject({
    config,
    version,
  }: Pick<ProjectInterface, 'config' | 'version'>): VersionedSavedMapConfig {
    return new VersionedSavedMapConfig(config, version);
  }

  private static getKeplerVersionedDatasetsFromProject({
    datasets,
  }: Pick<ProjectInterface, 'datasets'>): KeplerVersionedDataset[] {
    return datasets;
  }

  public load(savedMap: SavedMap): LoadedMap {
    const loadedMap = this.schemaManager.load(savedMap.datasets, savedMap.config);

    return {
      datasets: [],
      ...loadedMap,
      config: {
        ...loadedMap.config,
        mapStyle: SavedMapStyle.enhance(loadedMap.config?.mapStyle, process.env.REACT_APP_MAPBOX_ACCESS_TOKEN),
      },
    };
  }

  public save(keplerGlState: DatatlasGlState): SavedMap {
    return this.schemaManager.save(keplerGlState) as unknown as SavedMap;
  }
}

export const keplerMapFactory = new KeplerMapFactory(schemaManager);
