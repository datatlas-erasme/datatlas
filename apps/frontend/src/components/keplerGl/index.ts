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
  replaceAddDataButtonFactory,
  replacePanelToggleFactory,
  replacePanelTitle,
} from './factories';

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
