# Internationalization

There are 2 instances of `react-intl` used here :

- the **Kepler.gl** one
- the **Datatlas** specific one

> In the first implementation, the dictionaries were seperated :
>
> - one to translate **Kepler.gl** keys, **including the overridden components in `../components/keplerGl/`**.
> - one for **Datatlas** in `json`, which could be regenerated using the `npm run extract-compile`.
>
> Now there is only one combining both but in `ts` format.

> **Warning**
> If you're translation doesn't appears, try to use the string notation as the the dictionnary key instead of the nested object form.
>
> For example, use :
>
> `modal.title.deleteProject: 'Delete project',`
>
> Instead of :
>
> ```
> modal: {
>     title: {
>       deleteProject: 'Delete project',
>     },
> },
> ```

## `formatjs/cli`

The CLI may still be used to generate a `json` dictionary, but the content must be manually added to the `ts` dictionaries :

```shell
npm run extract-compile
```

If you don't specify an `id` when using the `<FormattedMessage />` component or `formatMessage` function,
an `id` will be generated using the `idInterpolationPattern` strategy defined in the `formatjs extract` command.

> _The `idInterpolationPattern` used is the following `[sha512:contenthash:base64:6]` and is defined both in `.babelrc` and in `package.json`._

## `react-intl`

⚠ As long as **Kepler.gl** uses version `react-intl^3` we're stuck with it.
Newer version make the custom `KeplerGlFactory` crash.

## Resources

- https://formatjs.io/docs/react-intl/
- https://formatjs.io/docs/tooling/cli/
- https://formatjs.io/docs/tooling/babel-plugin
