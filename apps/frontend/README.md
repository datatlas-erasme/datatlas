# Datatlas App

## Getting started

> See main [../../README.md](../../README.md) in project root directory.

### Development

**Kepler.gl** uses **Mapbox GL JS** to render map styles.
You must configure the `REACT_APP_MAPBOX_ACCESS_TOKEN` environment variable in a `.env` file (see `./apps/frontend/.env.example` for an example).

> https://docs.mapbox.com/help/getting-started/access-tokens/

```
nx serve frontend
```

> `nx` commands should be run from the `nx` project root directory.
> If you don't want to install the `nx` CLI globally you may use `npx` instead.

## Design decisions

The **frontend** is the one responsible of **Kepler.gl** data reconciliation.
**Redux** actions update the local state and thereafter a whole **Kepler.gl** state is send to the **backend**.

## Test

```shell
npx nx run frontend:test
```

> Some useful resources to understand the **frontend** testing strategy :
>
> - https://redux.js.org/usage/writing-tests
> - https://mswjs.io/
> - https://github.com/mswjs/examples/tree/master/examples/rest-react/src

### Internationalization

> see [./src/i18n/index.md](./src/i18n/index.md)

## Stack

- [@reduxjs/toolkit](https://redux-toolkit.js.org/) to handle `redux` related stuff.
- [RTK Query](https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics) to perform API calls.

> We're querying the `api` state slice to display data in components.
>
> - https://redux-toolkit.js.org/api/createEntityAdapter
> - https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#transforming-responses
> - https://dev.to/srmagura/the-great-redux-toolkit-debate-5045

## Kepler.gl

### Dependency injection

**Kepler.gl** uses its own **dependency injection** system :
https://docs.kepler.gl/docs/api-reference/advanced-usages/replace-ui-component#inject-components

For advanced usages, meaning not only replacing an existing component, for example :

- adding a dependency to an existing component
- adding a custom factory which depends on others **Kepler.gl** factories
- calling the `injector` manually

You need to use the `provideRecipesToInjector` to decorate **Kepler.gl** `injector` and used the one returned by this method.
Only then you may then call this `injector` and expecting a predictable behavior.

### Schema

You may add or remove properties from KeplerGl schema.

> see `apps/frontend/src/kepler/schema-manager.ts` for some examples.

### Filters

Filters props can be retrieved via the `dataset` which is an instance of a `KeplerTable` : `dataset.getColumnFilterProps`

`visState.layerdata` is the state slice holding the data rendered on the map.
This part is recalculated from the `datasets` and `filters` part when an updated occurs.

Each type of layer implement an `updateData` method which may internally call `calculateDataAttribute`.

```javascript
export const LayerClasses = {
  [LAYER_TYPES.point]: PointLayer,
  [LAYER_TYPES.arc]: ArcLayer,
  [LAYER_TYPES.line]: LineLayer,
  [LAYER_TYPES.grid]: GridLayer,
  [LAYER_TYPES.hexagon]: HexagonLayer,
  [LAYER_TYPES.geojson]: GeojsonLayer,
  [LAYER_TYPES.cluster]: ClusterLayer,
  [LAYER_TYPES.icon]: IconLayer,
  [LAYER_TYPES.heatmap]: HeatmapLayer,
  [LAYER_TYPES.hexagonId]: H3Layer,
  [LAYER_TYPES['3D']]: ScenegraphLayer,
  [LAYER_TYPES.trip]: TripLayer,
  [LAYER_TYPES.s2]: S2GeometryLayer,
};
```

All these layers have there own implementation of `calculateDataAttribute` :
`AggregationLayer`
`ArcLayer`
`GeojsonLayer`
`HexagonLayer`
`IconLayer`
`PointLayer`
`S2GeometryLayer`
`TripLayer`

Imported data are imported with `processFileData` :

```
  if (isKeplerGlMap(data)) {
    format = DATASET_FORMATS.keplergl;
    processor = processKeplerglJSON;
  } else if (isRowObject(data)) {
    format = DATASET_FORMATS.row;
    processor = processRowObject;
  } else if (isGeoJson(data)) {
    format = DATASET_FORMATS.geojson;
    processor = processGeojson;
  }
```

### Side effects

Side effects should be handled _via_ `@reduxjs/toolkit` but first, you should ask yourself :

1. If The action you want to dispatch is just here forward some data to your state, you might not need a side effect, see if it can be handled directly in one of your reducer instead:

- https://github.com/reduxjs/redux-toolkit/issues/1509#issuecomment-919255436

2. If you need to wait for an API call to complete, you may just need to `dispatch` your side-effect in the `onQueryStarted` hook function.

- https://redux-toolkit.js.org/rtk-query/usage/queries

3. Your side effects require a complex workflow, then use a custom `createListenerMiddleware`:

- https://redux-toolkit.js.org/api/createListenerMiddleware

### Compiling **Kepler.gl** from source

Downgrade to Node.js v16.

> You mays use [**n**](https://github.com/tj/n) or \__nvm_ in order to do so.

You might need to manually set your `c` compiler version to something older :

```
CXX=g++-9 yarn
```

### Advanced reducer customization

Reducer `plugins` aren't made to replace an existing action.
If a **Kepler.gl** action is faulty, you must recreate the reducer slice from scratch.
Unfortunately, most of **Kepler.gl** objects aren't exported so you must duplicate it in your own source code.

> See [./apps/frontend/src/store/reducers/keplerGl/vis-state.ts](./apps/frontend/src/store/reducers/keplerGl/vis-state.ts) for example.
