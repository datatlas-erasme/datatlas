import { KeplerGlSchema } from 'kepler.gl/schemas';
import { KeplerGlState } from 'kepler.gl/reducers';
import { KeplerMapConfig, KeplerVersionedDataset, KeplerVersionedMapConfig } from './kepler';
import { ProjectInterface } from './ProjectInterface';
import { DatasetInterface } from './DatasetInterface';
import { UserInterface } from './UserInterface';
import { NormalizedProjectInterface } from './NormalizedProjectInterface';
import { DatatlasSavedMapInterface } from './DatatlasSavedMapInterface';
import { LoadingProjectInterface } from './LoadingProjectInterface';
import { UserCredentials, UserCredentialsInterface } from './auth';

export class Project implements ProjectInterface {
  id: number;
  title: string;
  createdAt: Date;
  draft: boolean;
  datasets: DatasetInterface[] = [];
  description?: string;
  owner: UserInterface;
  contributors: UserInterface[];
  config: KeplerMapConfig;
  version: KeplerVersionedMapConfig['version'];

  constructor(project: ProjectInterface) {
    this.id = project.id;
    this.title = project.title;
    this.createdAt = project.createdAt;

    this.draft = project.draft;
    this.datasets = project.datasets;
    this.description = project.description;
    this.owner = project.owner;
    this.contributors = project.contributors;
    this.version = 'v1';
    this.config = new KeplerMapConfig();
  }

  static normalize({ owner, contributors, ...props }: ProjectInterface): NormalizedProjectInterface {
    return {
      ...props,
      ownerId: owner.id,
      contributorIds: contributors.map(({ id }) => id),
    };
  }

  normalize() {
    return Project.normalize(this);
  }

  static isDraft({ draft }: Pick<ProjectInterface, 'draft'>) {
    return draft;
  }

  static isOwner(project?: { owner?: Pick<UserInterface, 'id'> }, userCredentials?: UserCredentialsInterface) {
    return !!userCredentials && project && project?.owner?.id && project.owner.id === userCredentials.id;
  }

  static isOwnerOrAdmin(project?: { owner?: Pick<UserInterface, 'id'> }, userCredentials?: UserCredentialsInterface) {
    return Project.isOwner(project, userCredentials) || UserCredentials.isAdmin(userCredentials);
  }

  static isPublished({ draft }: Pick<ProjectInterface, 'draft'>) {
    return !draft;
  }

  static canBeViewedBy(project: Pick<Project, 'owner' | 'draft'>, userCredentials?: UserCredentials) {
    if (Project.isDraft(project)) {
      if (!Project.canBeEditedBy(project, userCredentials)) {
        return false;
      }
    }

    return true;
  }

  static canBeEditedBy(project?: { owner?: Pick<UserInterface, 'id'> }, userCredentials?: UserCredentialsInterface) {
    return UserCredentials.isActive(userCredentials) && Project.isOwnerOrAdmin(project, userCredentials);
  }

  // This is hack since DTO classes can't be used in the frontend... -_-
  static canProjectDtoBeEditedBy(projectDto?: { owner: number }, userCredentials?: UserCredentialsInterface) {
    return projectDto && Project.canBeEditedBy({ owner: { id: projectDto.owner } }, userCredentials);
  }

  static canBeDeletedBy(project?: { owner?: Pick<UserInterface, 'id'> }, userCredentials?: UserCredentialsInterface) {
    return Project.canBeEditedBy(project, userCredentials);
  }

  isDraft() {
    return Project.isDraft(this);
  }

  /**
   * @deprecated use ProjectFactory.createProjectFromKeplerInstance instead
   */
  static createProjectFromKeplerInstance(
    id: string,
    keplerGlState: KeplerGlState,
    owner?: UserInterface
  ): LoadingProjectInterface {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const savedMap = KeplerGlSchema.save(keplerGlState) as DatatlasSavedMapInterface;
    return {
      draft: true,
      contributors: [],
      ...Project.createPartialProjectFromKeplerSavedMap(savedMap),
      id: parseInt(id),
      owner,
    };
  }

  static createPartialProjectFromKeplerSavedMap(
    savedMap: DatatlasSavedMapInterface
  ): Omit<ProjectInterface, 'owner' | 'id' | 'draft' | 'contributors' | 'copyEnabled'> {
    return {
      title: '',
      ...savedMap.config,
      ...savedMap.info,
      description: savedMap.info.description || '',
      datasets: savedMap.datasets.map(Project.mapVersionedKeplerDatasetToDataset),
    };
  }

  static mapVersionedKeplerDatasetToDataset(dataset: KeplerVersionedDataset) {
    return {
      ...dataset,
      id: dataset.data.id,
      url: dataset.data.label,
      updatedAt: new Date(),
      checksum: '',
      warning: '',
    };
  }

  static getSortingFunction() {
    return (a: Pick<ProjectInterface, 'createdAt'>, b: Pick<ProjectInterface, 'createdAt'>) =>
      a.createdAt.getTime() - b.createdAt.getTime();
  }
}
