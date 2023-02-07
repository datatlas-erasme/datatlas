import { faker } from '@faker-js/faker';
import { ProjectInterface, UserInterface } from '../';

export const generateFakeUser = (partialUser: Partial<UserInterface> = {}): UserInterface => ({
  id: faker.datatype.number(100),
  email: faker.internet.email(),
  password: faker.internet.password(),
  ...partialUser,
});

export const generateFakeProject = (partialUser: Partial<ProjectInterface> = {}): ProjectInterface => ({
  id: faker.datatype.number(100),
  name: faker.animal.insect(),
  datasets: [],
  owner: generateFakeUser(),
  draft: faker.datatype.boolean(),
  updatedAt: faker.datatype.datetime(),
  ...partialUser,
});

export const generateFakeProjects = () =>
  Array.from(Array(faker.datatype.number(50)).keys()).map((id) => generateFakeProject({ id }));
