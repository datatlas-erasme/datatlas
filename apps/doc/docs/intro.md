---
sidebar_position: 1
---

# 🌍 Datatlas

## What is DatAtlas ?

DatAtlas is a project thats aims at creating the Wordpress for maps ! Thanks to this beautiful tool you will be able to create custom web maps by selecting your data, choosing your features, adding your style. Once your map is created you can embed it in any website you want. You want to create beautiful maps with 3D data ? With lot of layers ? With specific features ? You are at the right place !

## 🐤 Getting started

Datatlas is still under heavy development.
You can deploy it locally for development purpose.
The production version will be available soon.

### ⌨️ Development

#### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [Docker](https://docs.docker.com/get-docker/)

#### ⚙️ Installation

```bash
git clone https://github.com/datatlas-erasme/datatlas
cd datatlas
git checkout dev
npm install
```

#### 🔥 Run

Run the postgres database and pgadmin with docker

```bash
docker-compose up -f dev.docker-compose.yml

```

**Run them all**
you can run all the apps in the same shell with the following command

```bash
npx nx run-many --target=serve
```

**Run seperately**

In another shell, run the backend

```bash
npx nx serve backend
```

In another shell, run the frontend

```bash
npx nx serve frontend
```

You can optionnaly run the documentation

```bash
npx nx serve doc
```

You can now access :

- the frontend at http://localhost:3000
- the backend at http://localhost:3333
- pgadmin at http://localhost:5431
- the documentation at http://localhost:3001

#### 🔎 Test and lint

Jest, Cypress and husky are used for testing and 🌸 linting.

When committing, husky will run the linter (nx format:write) on all the files

**🧪 Unit tests**

You can run all the unit tests (backend/models/frontend) with the following command

```bash
npx nx run-many --target=test
```

**🧪 E2E tests**

We also use cypress for e2e testing on the backend

```bash
npx cypress run
```

### 🚀 Deploy

Built images are available on [Docker Hub](https://hub.docker.com/u/erasme)

- [🗺️ Frontend](https://hub.docker.com/r/erasme/datatlas-frontend)
- [📋 Backend](https://hub.docker.com/r/erasme/datatlas-backend)

**🐋 Docker run**

You can run the images with the following commands

```bash
docker run -d --name datatlas-db \
-e POSTGRES_USER=docker -e POSTGRES_PASS=docker -p 5432:5432 \
kartoza/postgis:15-3.3 \
&& docker run -d --name datatlas-backend -p 3333:3333 erasme/datatlas-backend \
&& docker run -d --name datatlas-frontend -p 3000:80 erasme/datatlas-frontend

```

** 🐳 Docker build**

You can build the images locally with the following commands

```bash
docker-compose build -f prod.docker-compose.yml
```

## Contributing

- I'm a developer, how can I contribute ?
- I'm a designer, how can I contribute ?
- I'm a user, how can I contribute ?
- I'm a researcher, how can I contribute ?
