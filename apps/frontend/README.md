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

### Side effects

Side effects should be handled _via_ `@reduxjs/toolkit` but first, you should ask yourself :

1. If The action you want to dispatch is just here forward some data to your state, you might not need a side effect, see if it can be handled directly in one of your reducer instead:
   - https://github.com/reduxjs/redux-toolkit/issues/1509#issuecomment-919255436
2. If you need to wait for an API call to complete, you may just need to `dispatch` your side-effect in the `onQueryStarted` hook function.
   - https://redux-toolkit.js.org/rtk-query/usage/queries
3. Your side effects require a complex workflow, then use a custom `createListenerMiddleware`:
   - https://redux-toolkit.js.org/api/createListenerMiddleware