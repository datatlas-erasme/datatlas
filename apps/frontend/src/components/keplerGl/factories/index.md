# KeplerGl customization

## Factories

> See `node_modules/kepler.gl/src/components/index.js` for a full list of the factories.

### Side Panel

Each _tab_ in the side panel is associated with a `*ManagerFactory` :

1. `LayerManagerFactory` handle the whole content of the layer tab.
   - `LayerPanelFactory` the panel which opens when you click on a layer
   - `LayerConfiguratorFactory` the layer configurator inside a layer panel. The most verbose component, that's why in the `Datatlas` codbase most of the function component have been splitted in the `./configurator` directory.
   - `SourceDataCatalogFactory` the list of datasets
   - `SourceDataSelectorFactory` the dropdown list to select a dataset
2. `FilterManagerFactory`
3. `InteractionManagerFactory`
4. `MapManagerFactory`

> https://github.com/datatlas-erasme/datatlas/issues/66

> **How to** access a dataset id:
>
> - `layers[0].config.dataId`
> - `filters[0].dataId`
> - `datasets[dataId].id`

# Code style

Code style is kept as close as possible as the one from **Kepler.gl**. That's why you'll find local `.prettierrc` and `.eslintrc` files.
