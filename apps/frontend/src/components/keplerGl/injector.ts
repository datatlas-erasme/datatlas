import {appInjector as keplerAppInjector, provideRecipesToInjector} from '@kepler.gl/components';
import {
  replaceFileUpload,
  replaceLoadDataModal,
  replaceLayerManager,
  replaceLayerPanelHeader,
  replaceLayerPanel,
  replaceLocalePanel,
  replaceFilterManager,
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
  replaceModalDialog,
  replaceMapManager,
  replaceMapPopoverFactory,
  replaceLayerHoverInfoFactory
} from './factories';
import {provideSortableLayerListFactory} from './side-panel/layer/SortableLayerList';

// ⚠ Order matters ⚠
export const appInjector = provideRecipesToInjector(
  [
    replaceKeplerGL(),
    replaceMapPopoverFactory(),
    replaceLayerHoverInfoFactory(),
    replaceModalDialog(),
    replacePanelHeader(),
    replacePanelToggleFactory(),
    replacePanelTab(),
    replaceLayerManager(),
    replaceMapManager(),
    replaceLoadDataModal(),
    replaceFileUpload(),
    replaceLayerPanel(),
    replaceLayerPanelHeader(),
    replaceMapControl(),
    replaceLocalePanel(),
    replaceFilterManager(),
    replaceInteractionManager(),
    replaceInteractionPanel(),
    replaceTooltipConfig(),
    replacePanelTitle(),
    replaceAddDataButtonFactory(),
    replaceFilterPanel(),
    provideRangerFilter(),
    provideMultiSelectFilter(),
    provideSortableLayerListFactory()
  ],
  keplerAppInjector
);
