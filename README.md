# Datatlas

🌍 **DatAtlas** is a geospatial data vizualization tool ✨ based on **Kepler.gl** and developed by [**Erasme**](https://www.erasme.org), the open innovation lab of the **Lyon** 🇫🇷 metropolitan area.

**DatAtlas** allows to create and share custom interactive maps from various datasource:

1. Name your map and choose your favorite map style 💅
2. Import datasources from files or URLS in `GeoJson`, `csv`, etc.
3. Customize the UI for your visitors ✨
4. Publish and share your map with the world! 🌍

![A 3D map of the industries around Lyon and Saint-Etienne. It represents the number of industry on a territory using clusters displayed as 3D stacked histograms. This map was created with DatAtlas.](https://user-images.githubusercontent.com/33604381/183027634-6bb76d0f-cb53-412c-93cb-2af5acb290e4.png)

## Under the hood

**DatAtlas** is a custom **Kepler.gl** frontend with a **Nestjs** API allowing to save and share your maps via a URL.

**Kepler.gl** is an open-source, data-agnostic, high-performance app for visual exploration of large-scale geolocation data sets. It's built on top of [Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js) and [DECK.gl](https://deck.gl/).
It can render **millions** of points representing thousands of trips and perform spatial aggregations on the fly.

**DatAtlas** fix some of **Kepler.gl** issues to allow multiple maps to work flawlessly in a single app.

It also brings documentation on some hidden customization features and shed some light on some of the complex patterns used in the **Kepler.gl** codebase.

> _Support our contributions to the **Kepler.gl** codebase!_ > https://github.com/keplergl/kepler.gl/issues?q=is%3Aopen+author%3Alutangar

## Getting started

```sh
npm install
cp .env.example .env
docker compose up
npx nx serve backend
npx nx serve frontend
```

> Or both:
>
> ```sh
> npx nx run-many --target=serve
> ```

It opens a new tab at http://localhost:3000/.
The app will automatically reload if you change any of the source files.

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

### Frontend

> See **app** [./apps/frontend/README.md](./apps/frontend/README.md)

### Backend

> See **API** [./apps/backend/README.md](./apps/backend/README.md)

## Development

> Visit the [Nx Documentation](https://nx.dev) to learn more.

### Code quality

Run both `prettier` and `eslint`:

```sh
npx nx format:write --base=origin/dev && npx nx run-many --target=lint --base=origin/dev
```

### Bulk dependencies updates

To update `nestjs` and keep in sync all side packages:

```sh
npx npm-check-updates --filter "@nestjs/*" -u
```

Or to update `mikro-orm` and friends:

```sh
npx npm-check-updates --filter "@mikro-orm/*" -
```

### Database migrations

```sh
npm run mikro-orm migration:create
npm run mikro-orm migration:up
```

### Test

Run a single test file:

```sh
npx nx run backend-e2e:e2e --spec apps/backend-e2e/src/e2e/user.cy.ts
```

> See https://github.com/cypress-io/cypress/issues/2610#issuecomment-1319738814

Output test results to a log file for debugging purpose:

```sh
npx nx run backend-e2e:e2e --spec apps/backend-e2e/src/e2e/user.cy.ts &> cypress.log
```

> See **Cypress** documentation :
> https://github.com/nrwl/nx/tree/master/packages/cypress/docs

## Deployment

### Kubernetes

You can deploy the datatlas stack on a kubernetes cluster using the provided helm chart.

Copy the `helm/example.values.yaml` file to values.yaml and edit it to fit your needs.

Then run the following command to deploy the stack:

```sh
helm install datatlas ./helm --create-namespace --namespace datatlas
```

## Credits

**DatAtlas** was created by [**Erasme**](https://www.erasme.org), the open innovation lab of Lyon 🇫🇷 metropolitan area. It's a part of the larger [**DatAgora**](https://www.erasme.org/DatAgora) initiative.

This project was supported by the [**France Relance**](https://www.economie.gouv.fr/plan-de-relance) economic recovery plan.

[**Figma** sketch](https://www.figma.com/proto/lVX7Lycox3AGixBhhbhQsQ/DatAtlas) was made by [SiaPartners](https://www.sia-partners.com/).
