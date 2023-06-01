import { KeplerGLSchema } from 'kepler.gl/schemas';
import { DatatlasSavedMapInterface, Project, ProjectInterface, UserInterface } from '@datatlas/models';
import { DatatlasGlState } from '../store/reducers/keplerGl';
import { schemaManager } from './schema-manager';

export class ProjectFactory {
  schemaManager: KeplerGLSchema;
  constructor(schemaManager: KeplerGLSchema) {
    this.schemaManager = schemaManager;
  }

  createProjectFromState(id: string, state: DatatlasGlState, owner: UserInterface): ProjectInterface {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const savedMap = this.schemaManager.save(state) as DatatlasSavedMapInterface;
    return {
      draft: true,
      contributors: [],
      ...ProjectFactory.createPartialProjectFromSavedMap(savedMap),
      id: parseInt(id),
      owner,
    };
  }

  static createPartialProjectFromSavedMap(
    savedMap: DatatlasSavedMapInterface
  ): Omit<ProjectInterface, 'owner' | 'id' | 'draft' | 'contributors' | 'copyEnabled'> {
    return {
      title: '',
      description: '',
      ...savedMap.config,
      ...savedMap.info,
      datasets: savedMap.datasets.map(Project.mapVersionedKeplerDatasetToDataset),
    };
  }
}

export const projectFactory = new ProjectFactory(schemaManager);
