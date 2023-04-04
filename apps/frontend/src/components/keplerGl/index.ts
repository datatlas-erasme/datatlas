import { injectComponents } from 'kepler.gl';
import {
  replaceLoadDataModal,
  replaceLayerManager,
  replaceLayerPanelHeader,
  replaceLayerPanel,
  replaceLocalePanel,
  replaceFilterManager,
  replaceLayerConfigurator,
  replaceInteractionManager,
  replaceKeplerGL,
  replacePanelHeader,
  replaceSidePanel,
  replaceTooltipConfig,
} from './factories';

// /!\ Order matters /!\
export const KeplerGl = injectComponents([
  replaceKeplerGL(),
  replaceSidePanel(),
  replacePanelHeader(),
  replaceLayerManager(),
  replaceLoadDataModal(),
  replaceLayerPanel(),
  replaceLayerPanelHeader(),
  replaceLocalePanel(),
  replaceFilterManager(),
  replaceLayerConfigurator(),
  replaceInteractionManager(),
  replaceTooltipConfig(),
]);
