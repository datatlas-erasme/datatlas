import { CreateProjectDto, ProjectDto } from './project';
import { faker } from '@faker-js/faker';
import { SavedMapConfig } from '@datatlas/models';
import { generateArray, generateFakeDataset } from '@datatlas/models/generators';

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
  config: new SavedMapConfig(),
  ...partialProject,
});

export const generateFakeProjectDtos = () => generateArray().map((id) => generateFakeProjectDto({ id }));

export const generateFakeCreateProjectDto = (
  partialCreateProjectDto: Partial<CreateProjectDto> = {}
): CreateProjectDto => ({
  title: faker.animal.insect(),
  description: faker.lorem.lines(1),
  datasets: generateArray(2).map(() => generateFakeDataset()),
  draft: faker.datatype.boolean(),
  version: 'v1' as const,
  config: new SavedMapConfig(),
  ...partialCreateProjectDto,
});
