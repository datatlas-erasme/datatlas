import { faker } from '@faker-js/faker';
import { DatasetInterface, KeplerMapConfig, ProjectInterface, Roles, UserInterface } from '../';

export const generateArray = (l = faker.datatype.number(25)) => Array.from(Array(faker.datatype.number(l)).keys());

export const generateFakeUser = (partialUser: Partial<UserInterface> = {}): UserInterface => ({
  id: faker.datatype.number(100),
  email: faker.internet.email(),
  password: faker.internet.password(),
  name: faker.name.fullName(),
  active: faker.datatype.boolean(),
  role: Roles.ADMIN,
  ...partialUser,
});

export const generateFakeDataset = (partialDataset: Partial<DatasetInterface> = {}): DatasetInterface => {
  const id = faker.datatype.string(5);
  return {
    id,
    url: faker.internet.url(),
    version: 'v1',
    checksum: faker.datatype.string(),
    updatedAt: faker.date.past(),
    warning: faker.lorem.sentence(5),
    data: generateFakeDatasetData({ id }),
    ...partialDataset,
  };
};

export const generateFakeDatasetData = (
  partialDatasetData: Partial<DatasetInterface['data']> = {}
): DatasetInterface['data'] => ({
  id: faker.datatype.string(5),
  allData: generateArray(2).map(() => [[generateFakeGeoJsonFeature(), faker.animal.bear()]]),
  label: 'Bears',
  color: faker.color.rgb({ format: 'decimal' }),
  fields: [
    { name: '_geojson', type: 'geojson' },
    { name: 'bear', type: 'string' },
  ],
  ...partialDatasetData,
});

export const generateFakeGeoJsonFeature = () => ({
  geometry: { type: 'Point', coordinates: [faker.address.latitude(), faker.address.longitude()] },
  type: 'Feature',
  properties: {},
});

export const generateFakeProject = (partialProject: Partial<ProjectInterface> = {}): ProjectInterface => ({
  id: faker.datatype.number(100),
  title: faker.animal.insect(),
  description: faker.lorem.lines(1),
  datasets: generateArray(2).map(() => generateFakeDataset()),
  owner: generateFakeUser(),
  createdAt: faker.date.past(),
  draft: faker.datatype.boolean(),
  contributors: faker.helpers.arrayElements([generateFakeUser()], 4),
  version: 'v1' as const,
  config: new KeplerMapConfig(),
  ...partialProject,
});

export const generateFakeProjects = () => generateArray().map((id) => generateFakeProject({ id }));
