import { injectComponents } from 'kepler.gl';
import {
  replaceLoadDataModal,
  replaceLayerManager,
  replaceLayerPanelHeader,
  replaceLayerPanel,
  replaceFilterManager,
  replaceLayerConfigurator,
  replaceInteractionManager,
  replacePanelHeader,
  replaceTooltipConfig,
} from './factories';

export const KeplerGl = injectComponents([
  replaceLoadDataModal(),
  replaceLayerManager(),
  replaceLayerPanel(),
  replaceLayerPanelHeader(),
  replaceFilterManager(),
  replaceLayerConfigurator(),
  replaceInteractionManager(),
  replacePanelHeader(),
  replaceTooltipConfig(),
]);
