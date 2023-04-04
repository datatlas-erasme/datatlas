# Internationalization

There are 2 instances of `react-intl` used here :

- the **Kepler.gl** one
- the **Datatlas** specific one

## Kepler.gl

Everything related to **Kepler.gl** is kept in the `./kepler` directory :

- the list of available locales in **Kepler.gl**
- the dictionaries

These dictionaries are used to translated **Kepler.gl** keys, **including the overridden components in `../components/keplerGl/`**.
These keys shouldn't be extracted using `formatjs/cli`.

## Datatlas

Available locales should be declared in `./index.ts` and dictionaries should be kept in this directory in `json`.
The reference file is the `fr.json` file and can be regenerated with the `npm run extract-compile` command.

If you don't specify an `id` when using the `<FormattedMessage />` component or `dazdzad` function,
an `id` will be generated using the `idInterpolationPattern` strategy defined in the `formatjs extract` command.

> _The `idInterpolationPattern` used is the following `[sha512:contenthash:base64:6]` and is defined both in `.babelrc` and in `package.json`._

## `react-intl`

As long as **Kepler.gl** uses version `react-intl^3` we're stuck with it.
Newer version make the custom `KeplerGlFactory` crash.

## Resources

- https://formatjs.io/docs/react-intl/
- https://formatjs.io/docs/tooling/cli/
- https://formatjs.io/docs/tooling/babel-plugin
