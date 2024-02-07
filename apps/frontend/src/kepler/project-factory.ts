import {
  DatatlasGlState,
  enhanceGlState,
  LoadingProjectInterface,
  Project,
  ProjectInterface,
  PublicUserInterface,
  SavedMap,
} from '@datatlas/models';
import { UpdateProjectRequestInterface } from '@datatlas/dtos';
import { KeplerGLSchema } from '@kepler.gl/schemas/dist/schema-manager';
import { schemaManager } from './schema-manager';

export class ProjectFactory {
  schemaManager: KeplerGLSchema;

  constructor(schemaManager: KeplerGLSchema) {
    this.schemaManager = schemaManager;
  }

  public createProjectFromKeplerInstance(
    id: string,
    keplerGlState: DatatlasGlState,
    contributors: PublicUserInterface[],
    owner?: PublicUserInterface
  ): LoadingProjectInterface {
    const savedMap = this.schemaManager.save(enhanceGlState(keplerGlState)) as unknown as SavedMap;
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
    keplerGlState: DatatlasGlState
  ): UpdateProjectRequestInterface {
    const savedMap = this.schemaManager.save(keplerGlState) as unknown as SavedMap;

    return {
      draft: true,
      contributorsIds: [],
      id: parseInt(id),
      ...this.createPartialProjectFromKeplerSavedMap(savedMap),
    };
  }

  public createPartialProjectFromKeplerSavedMap(
    savedMap: SavedMap
  ): Omit<ProjectInterface, 'owner' | 'id' | 'draft' | 'contributors' | 'copyEnabled'> {
    return Project.createPartialProjectFromKeplerSavedMap(savedMap);
  }
}

export const projectFactory = new ProjectFactory(schemaManager);
