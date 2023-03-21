import { injectComponents } from 'kepler.gl';
import { replaceLayerManager } from './factories/LayerManagerFactory';
import { replaceLoadDataModal } from './factories/LoadDataModalFactory';
import { replaceLayerPanelHeader } from './factories/LayerPanelHeaderFactory';
import { replaceLayerPanel } from './factories/LayerPanelFactory';
import { replaceFilterManager } from './factories/FilterManagerFactory';

export const KeplerGl = injectComponents([
  replaceLoadDataModal(),
  replaceLayerManager(),
  replaceLayerPanelHeader(),
  replaceLayerManager(),
  replaceLayerPanel(),
  replaceFilterManager(),
]);
