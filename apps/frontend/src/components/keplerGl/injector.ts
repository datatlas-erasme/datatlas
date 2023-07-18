import { appInjector as keplerAppInjector } from 'kepler.gl';
import { provideRecipesToInjector } from 'kepler.gl/dist/components';
import {
  replaceFileUpload,
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
  replaceInteractionPanel,
  replaceFilterPanel,
  provideRangerFilter,
  provideMultiSelectFilter,
} from './factories';

// ⚠ Order matters ⚠
export const appInjector = provideRecipesToInjector(
  [
    replaceKeplerGL(),
    replacePanelHeader(),
    replacePanelToggleFactory(),
    replacePanelTab(),
    replaceLayerManager(),
    replaceLoadDataModal(),
    replaceFileUpload(),
    replaceLayerPanel(),
    replaceLayerPanelHeader(),
    replaceMapControl(),
    replaceLocalePanel(),
    replaceFilterManager(),
    replaceLayerConfigurator(),
    replaceInteractionManager(),
    replaceInteractionPanel(),
    replaceTooltipConfig(),
    replacePanelTitle(),
    replaceAddDataButtonFactory(),
    replaceFilterPanel(),
    provideRangerFilter(),
    provideMultiSelectFilter(),
  ],
  keplerAppInjector
);
