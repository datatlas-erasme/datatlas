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
  replacePanelTab,
  replaceTooltipConfig,
} from './factories';
import { replacePanelTitle } from './factories/PanelTitleFactory';
import { replacePanelToggleFactory } from './factories/PanelToggleFactory';
import { replaceAddDataButtonFactory } from './factories/AddDataButtonFactory';

// ⚠ Order matters ⚠
export const KeplerGl = injectComponents([
  replaceKeplerGL(),
  replacePanelHeader(),
  replaceLayerManager(),
  replaceLoadDataModal(),
  replaceLayerPanel(),
  replaceLayerPanelHeader(),
  replaceLocalePanel(),
  replaceFilterManager(),
  replaceLayerConfigurator(),
  replaceInteractionManager(),
  replacePanelToggleFactory(),
  replacePanelTab(),
  replaceTooltipConfig(),
  replacePanelTitle(),
  replaceAddDataButtonFactory(),
]);
