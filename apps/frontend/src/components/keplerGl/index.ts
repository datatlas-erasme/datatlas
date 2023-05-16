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
  replaceMapControl,
} from './factories';

// ⚠ Order matters ⚠
export const KeplerGl = injectComponents([
  replaceKeplerGL(),
  replacePanelHeader(),
  replacePanelToggleFactory(),
  replacePanelTab(),
  replaceLayerManager(),
  replaceLoadDataModal(),
  replaceLayerPanel(),
  replaceLayerPanelHeader(),
  replaceMapControl(),
  replaceLocalePanel(),
  replaceFilterManager(),
  replaceLayerConfigurator(),
  replaceInteractionManager(),
  replaceTooltipConfig(),
  replacePanelTitle(),
  replaceAddDataButtonFactory(),
]);
