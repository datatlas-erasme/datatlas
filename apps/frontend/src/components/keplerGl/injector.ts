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
  replaceMapManager
} from './factories';
import {replaceLayerHoverInfoFactory} from './factories/map/LayerHoverInfo';
import {replaceMapPopoverFactory} from './factories/map/MapPopoverFactory';
import {provideSortableLayerListFactory} from './side-panel/layer/SortableLayerList';

// ⚠ Order matters ⚠
export const appInjector = keplerAppInjector;
