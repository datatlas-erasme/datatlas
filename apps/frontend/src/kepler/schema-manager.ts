import {
  VERSIONS,
  Schema,
  InteractionSchemaV1,
  reducerSchema as keplerReducerSchema,
  propertiesV1,
  FilterSchemaV0,
  filterPropsV1,
} from '@kepler.gl/schemas';
import { KeplerGLSchema } from '@kepler.gl/schemas/dist/schema-manager';

export const interactionSchemaV1 = new InteractionSchemaV1({
  version: VERSIONS.v1,
  // `interactionPropsV1` isn't exported
  properties: ['tooltip', 'brush', 'geocoder', 'coordinate', 'filters'],
});

export const visStateSchemaV1 = new Schema({
  version: VERSIONS.v1,
  properties: {
    ...propertiesV1,
    interactionConfig: interactionSchemaV1,
    filters: new FilterSchemaV0({
      version: VERSIONS.v1,
      properties: { ...filterPropsV1, public: null },
    }),
  },
  key: 'visState',
});

const reducerSchema = {
  ...keplerReducerSchema,
  visState: {
    ...keplerReducerSchema.visState,
    [VERSIONS.v1]: visStateSchemaV1,
  },
};

export const schemaManager = new KeplerGLSchema({ reducers: reducerSchema });
