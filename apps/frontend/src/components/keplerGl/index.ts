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

export const KeplerGl = injectComponents([
  // replaceLoadDataModal(),
  replaceLayerManager(),
  // replaceLayerPanel(),
  // replaceLayerPanelHeader(),
  // replaceLocalePanel(),
  // replaceFilterManager(),
  // replaceLayerConfigurator(),
  // replaceInteractionManager(),
  replaceKeplerGL(),
  // replacePanelHeader(),
  replaceSidePanel(),
  // replaceTooltipConfig(),
  // replaceTooltipConfig(),
]);
