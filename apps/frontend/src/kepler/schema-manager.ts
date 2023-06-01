import { VERSIONS, Schema, InteractionSchemaV1, reducerSchema as keplerReducerSchema } from 'kepler.gl/schemas';
import { KeplerGLSchema } from 'kepler.gl/dist/schemas/schema-manager';
import { propertiesV1 } from 'kepler.gl/dist/schemas/vis-state-schema';

export const visStateSchemaV1 = new Schema({
  version: VERSIONS.v1,
  properties: {
    ...propertiesV1,
    interactionConfig: new InteractionSchemaV1({
      version: VERSIONS.v1,
      properties: ['tooltip', 'brush', 'geocoder', 'coordinate', 'filters'],
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
