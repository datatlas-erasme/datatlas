import {
  DatatlasSavedMapInterface,
  LoadingProjectInterface,
  Project,
  ProjectInterface,
  UserInterface,
} from '@datatlas/models';
import { KeplerGlSchema } from 'kepler.gl/schemas';
import { KeplerGlState } from 'kepler.gl/reducers';
import { schemaManager } from './schema-manager';

export class ProjectFactory {
  schemaManager: KeplerGlSchema;

  constructor(schemaManager: KeplerGlSchema) {
    this.schemaManager = schemaManager;
  }

  public createProjectFromKeplerInstance(
    id: string,
    keplerGlState: KeplerGlState,
    owner?: UserInterface
  ): LoadingProjectInterface {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const savedMap = this.schemaManager.save(keplerGlState) as DatatlasSavedMapInterface;
    return {
      draft: true,
      contributors: [],
      ...this.createPartialProjectFromKeplerSavedMap(savedMap),
      id: parseInt(id),
      owner,
    };
  }

  public createPartialProjectFromKeplerSavedMap(
    savedMap: DatatlasSavedMapInterface
  ): Omit<ProjectInterface, 'owner' | 'id' | 'draft' | 'contributors' | 'copyEnabled'> {
    return Project.createPartialProjectFromKeplerSavedMap(savedMap);
  }
}

export const projectFactory = new ProjectFactory(schemaManager);
