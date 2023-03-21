# KeplerGl customization

## Factories

> See `node_modules/kepler.gl/src/components/index.js` for a full list of the factories.

### Side Panel

- `LayerManagerFactory` handle the whole content of the layer tab.
- `LayerPanelFactory` the panel which opens when you click on a layer
- `LayerConfiguratorFactory` the layer configurator inside a layer panel
- `SourceDataCatalogFactory` the list of datasets
- `SourceDataSelectorFactory` the dropdown list to select a dataset

https://github.com/datatlas-erasme/datatlas/issues/66

Hide a lot of things #92

- geocoder tool
- brush
- coordinates
- in tooltip "comparison mode"
  [index.md](index.md)

**How to** access a dataset id:

- `layers[0].config.dataId`
- `filters[0].dataId`
- `datasets[dataId].id`
