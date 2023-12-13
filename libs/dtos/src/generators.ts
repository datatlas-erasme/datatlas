import { ProjectDto } from './project';
import { faker } from '@faker-js/faker';
import { generateArray, generateFakeDataset, KeplerMapConfig } from '@datatlas/models';

export const generateFakeProjectDto = (partialProject: Partial<ProjectDto> = {}): ProjectDto => ({
  id: faker.datatype.number(100),
  title: faker.animal.insect(),
  description: faker.lorem.lines(1),
  datasets: generateArray(2).map(() => generateFakeDataset()),
  owner: faker.datatype.number(),
  ownerId: faker.datatype.number(),
  createdAt: faker.date.past(),
  draft: faker.datatype.boolean(),
  contributorsIds: faker.helpers.arrayElements([faker.datatype.number(100)]),
  version: 'v1' as const,
  config: new KeplerMapConfig(),
  ...partialProject,
});

export const generateFakeProjectDtos = () => generateArray().map((id) => generateFakeProjectDto({ id }));
