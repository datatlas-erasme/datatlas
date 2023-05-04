import {
  UserInterface,
  KeplerVersionedDataset,
  KeplerVersionedMapConfig,
  ProjectInterface,
  DatatlasSavedMapInterface,
} from '@datatlas/models';
import { ProjectDto } from '@datatlas/dtos';

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new KeplerVersionedMapConfig(config, version);
  }

  private static getKeplerVersionedDatasetsFromProject({
    datasets,
  }: Pick<ProjectInterface, 'datasets'>): KeplerVersionedDataset[] {
    return datasets;
  }
}
