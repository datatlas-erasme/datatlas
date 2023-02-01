import { faker } from '@faker-js/faker';
import { KeplerGlSchema } from 'kepler.gl/schemas';
import { KeplerGlState } from 'kepler.gl/reducers';
import { KeplerMapConfig, KeplerVersionedDataset, KeplerVersionedMapConfig } from './kepler';
import { ProjectInterface } from './ProjectInterface';
import { DatasetInterface } from './DatasetInterface';
import { UserInterface } from './UserInterface';
import { NormalizedProjectInterface } from './NormalizedProjectInterface';
import { DraftProjectInterface } from './DraftProjectInterface';
import { DatatlasSavedMapInterface } from './DatatlasSavedMapInterface';

export class Project implements ProjectInterface {
  id: number | string;
  title: string;
  createdAt: Date;
  draft: boolean;
  datasets: DatasetInterface[] = [];
  description: string;
  owner: UserInterface;
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
    this.version = 'v1';
    this.config = new KeplerMapConfig();
  }

  static normalize({ owner, ...props }: ProjectInterface): NormalizedProjectInterface {
    return {
      ...props,
      ownerId: owner.id,
    };
  }

  normalize() {
    return Project.normalize(this);
  }

  static isDraft({ draft }: Pick<ProjectInterface, 'draft'>) {
    return draft;
  }

  isDraft() {
    return Project.isDraft(this);
  }

  static createDraft({
    ownerId,
    title,
  }: {
    ownerId: UserInterface['id'];
    title: ProjectInterface['title'];
  }): DraftProjectInterface {
    return {
      id: faker.datatype.uuid(),
      title,
      description: '',
      ownerId,
      draft: true,
      datasets: [],
      ...new KeplerVersionedMapConfig(),
      createdAt: new Date(),
    };
  }

  static createProjectFromKeplerInstance(
    id: ProjectInterface['id'],
    keplerGlState: KeplerGlState,
    owner: UserInterface
  ): ProjectInterface {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const savedMap = KeplerGlSchema.save(keplerGlState) as DatatlasSavedMapInterface;
    return {
      ...Project.createPartialProjectFromKeplerSavedMap(savedMap),
      draft: false,
      owner,
      id,
    };
  }

  static createPartialProjectFromKeplerSavedMap(
    savedMap: DatatlasSavedMapInterface
  ): Omit<ProjectInterface, 'owner' | 'id' | 'draft'> {
    return {
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
