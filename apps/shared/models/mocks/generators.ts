import { faker } from '@faker-js/faker';
import { KeplerMapConfig, ProjectInterface, UserInterface } from '../';

export const generateFakeUser = (partialUser: Partial<UserInterface> = {}): UserInterface => ({
  id: faker.datatype.number(100),
  email: faker.internet.email(),
  password: faker.internet.password(),
  name: faker.name.fullName(),
  ...partialUser,
});

export const generateFakeProject = (partialProject: Partial<ProjectInterface> = {}): ProjectInterface => ({
  id: faker.datatype.number(100),
  title: faker.animal.insect(),
  description: faker.lorem.lines(1),
  datasets: [],
  owner: generateFakeUser(),
  createdAt: faker.date.past(),
  draft: faker.datatype.boolean(),
  contributors: faker.helpers.arrayElements([generateFakeUser()]),
  version: 'v1' as const,
  config: new KeplerMapConfig(),
  copyEnabled: true,
  ...partialProject,
});

export const generateFakeProjects = () =>
  Array.from(Array(faker.datatype.number(50)).keys()).map((id) => generateFakeProject({ id }));
