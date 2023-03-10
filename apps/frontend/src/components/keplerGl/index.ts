import { injectComponents } from 'kepler.gl';
import { replaceLayerManager } from './factories/LayerManagerFactory';
import { replaceLoadDataModal } from './factories/LoadDataModalFactory';
import { replaceLayerPanelHeader } from './factories/LayerPanelHeaderFactory';

export const KeplerGl = injectComponents([
  replaceLoadDataModal(),
  replaceLayerManager(),
  replaceLayerPanelHeader(),
  replaceLayerManager(),
]);
