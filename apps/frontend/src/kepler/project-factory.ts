import {
  DatatlasSavedMapInterface,
  LoadingProjectInterface,
  Project,
  ProjectInterface,
  PublicUserInterface,
} from '@datatlas/models';
import { UpdateProjectRequestInterface } from '@datatlas/dtos';
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
    contributors: PublicUserInterface[],
    owner?: PublicUserInterface
  ): LoadingProjectInterface {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const savedMap = this.schemaManager.save(keplerGlState) as DatatlasSavedMapInterface;
    return {
      draft: true,
      ...this.createPartialProjectFromKeplerSavedMap(savedMap),
      owner,
      contributors,
      id: parseInt(id),
    };
  }

  public createUpdateProjectRequestFromKeplerInstance(
    id: string,
    keplerGlState: KeplerGlState
  ): UpdateProjectRequestInterface {
    const savedMap = this.schemaManager.save(keplerGlState) as DatatlasSavedMapInterface;

    return {
      draft: true,
      contributorsIds: [],
      id: parseInt(id),
      ...this.createPartialProjectFromKeplerSavedMap(savedMap),
    };
  }

  public createPartialProjectFromKeplerSavedMap(
    savedMap: DatatlasSavedMapInterface
  ): Omit<ProjectInterface, 'owner' | 'id' | 'draft' | 'contributors' | 'copyEnabled'> {
    return Project.createPartialProjectFromKeplerSavedMap(savedMap);
  }
}

export const projectFactory = new ProjectFactory(schemaManager);
