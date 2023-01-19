import { ProjectInterface } from './ProjectInterface';
import { DatasetInterface } from './DatasetInterface';
import { UserInterface } from './UserInterface';
import { NormalizedProjectInterface } from './NormalizedProjectInterface';
import { DraftProjectInterface } from './DraftProjectInterface';
import { faker } from '@faker-js/faker';

export class Project implements ProjectInterface {
  id: number | string;
  name: string;
  draft: boolean;
  datasets: DatasetInterface[] = [];
  owner: UserInterface;

  constructor(project: ProjectInterface) {
    this.id = project.id;
    this.name = project.name;
    this.draft = project.draft;
    this.datasets = project.datasets;
    this.owner = project.owner;
  }

  static normalize({ id, name, owner, draft }: ProjectInterface): NormalizedProjectInterface {
    return {
      id,
      ownerId: owner.id,
      name,
      draft,
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

  static createDraft({ ownerId, name }: { ownerId: UserInterface['id'] }): DraftProjectInterface {
    return {
      id: faker.datatype.uuid(),
      name,
      ownerId,
      draft: true,
      datasets: [],
    };
  }
}
