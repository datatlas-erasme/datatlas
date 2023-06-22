import { KeplerGlSchema } from 'kepler.gl/schemas';
import { KeplerGlState } from 'kepler.gl/reducers';
import { KeplerMapConfig, KeplerVersionedDataset, KeplerVersionedMapConfig } from './kepler';
import { ProjectInterface } from './ProjectInterface';
import { DatasetInterface } from './DatasetInterface';
import { UserInterface } from './UserInterface';
import { NormalizedProjectInterface } from './NormalizedProjectInterface';
import { DatatlasSavedMapInterface } from './DatatlasSavedMapInterface';
import { LoadingProjectInterface } from './LoadingProjectInterface';

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

  static isOwner({ ownerId }: Pick<NormalizedProjectInterface, 'ownerId'>, partialUser?: Pick<UserInterface, 'id'>) {
    return !!partialUser && ownerId === partialUser.id;
  }

  static isPublished({ draft }: Pick<ProjectInterface, 'draft'>) {
    return !draft;
  }

  static canView(
    { ownerId, draft }: Pick<NormalizedProjectInterface, 'ownerId' | 'draft'>,
    partialUser?: Pick<UserInterface, 'id'>
  ) {
    return Project.isPublished({ draft }) || Project.isOwner({ ownerId }, partialUser);
  }

  static canEdit(
    { ownerId }: Pick<NormalizedProjectInterface, 'ownerId'>,
    partialUser?: Pick<UserInterface, 'id'>
  ): boolean {
    return !!partialUser && Project.isOwner({ ownerId }, partialUser);
  }

  isDraft() {
    return Project.isDraft(this);
  }

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
      description: '',
      ...savedMap.config,
      ...savedMap.info,
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
}
