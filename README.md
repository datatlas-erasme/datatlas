# Datatlas

## Getting started

### Locally

```
npm install
cp .env.example .env
```

### Using **Docker**

```
cp .env.example .env
docker compose up
nx run-many --target=serve
```

> **Note**: you must manually configure `pgadmin` :
>
> 1. Right-click _Servers > Register > Server..._
> 2. Under **Connection**:
>
> - **Host** `datatlas-db`
> - **Port**: `5432`
> - **Username**: `docker`
> - **Password**: `docker`
>
> https://towardsdatascience.com/how-to-run-postgresql-and-pgadmin-using-docker-3a6a8ae918b5

## Development

### Code quality

Run `prettier` on whole repository:

```
nx format:write
```

Run `lint` on whole repository

```
nx run-many --target=lint
```

### Internationalization

> see [./apps/frontend/src/i18n/index.md](./apps/frontend/src/i18n/index.md)

### Update dependencies

For example update `nestjs` :

```shell
npx npm-check-updates --filter "@nestjs/*" -u
```

Or to update `mikro-orm` :

```
npx npm-check-updates --filter "@mikro-orm/*" -u
```

### Frontend

**Kepler.gl** uses **Mapbox GL JS** to render map styles.
You must configure the `REACT_APP_MAPBOX_ACCESS_TOKEN` environment variable in a `.env` file (see `./apps/frontend/.env.example` for an example).

> https://docs.mapbox.com/help/getting-started/access-tokens/

```
nx serve frontend
```

#### Stack

- [redux-toolkit](https://redux-toolkit.js.org/) to handle `redux` related stuff.
- [RTK Query](https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics) is used to make API calls.

> We're querying the `api` state slice to display data in components.
> So the previous `projects` state slice isn't used right now but be used in the future if state normalization is required.
>
> - https://redux-toolkit.js.org/api/createEntityAdapter
> - https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#transforming-responses
> - https://dev.to/srmagura/the-great-redux-toolkit-debate-5045

### Test

Run a single test file:

```
npx nx run backend-e2e:e2e --spec apps/backend-e2e/src/e2e/user.cy.ts
```

https://github.com/cypress-io/cypress/issues/2610#issuecomment-1319738814

#### Frontend

```shell
npx nx run frontend:test
```

> Some useful resources to understand the **frontend** testing strategy :
>
> - https://redux.js.org/usage/writing-tests
> - https://mswjs.io/
> - https://github.com/mswjs/examples/tree/master/examples/rest-react/src

#### Cypress

https://github.com/nrwl/nx/tree/master/packages/cypress/docs

### Backend

```
nx serve backend
```

> Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Design

**Figma** sketch :
`https://www.figma.com/proto/lVX7Lycox3AGixBhhbhQsQ/DatAtlas`

> _Made by [SiaPartners](https://www.sia-partners.com/)._

## nx

<a href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

### Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
