import { PanelTitleFactory as KeplerPanelTitleFactory } from 'kepler.gl/components';

const PanelTitleFactory = () => () => null;

export function replacePanelTitle() {
  return [KeplerPanelTitleFactory, PanelTitleFactory];
}
