import { PanelTitleFactory as KeplerPanelTitleFactory } from 'kepler.gl/components';

const PanelTitleFactory = () => {
  return () => null;
};

PanelTitleFactory.deps = KeplerPanelTitleFactory.deps;
export function replacePanelTitle() {
  return [KeplerPanelTitleFactory, PanelTitleFactory];
}
