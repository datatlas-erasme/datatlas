import { PanelHeaderFactory as KeplerPanelHeaderFactory } from 'kepler.gl/components';

const PanelHeaderFactory = () => {
  return () => null;
};

PanelHeaderFactory.deps = KeplerPanelHeaderFactory.deps;
export function replacePanelHeader() {
  return [KeplerPanelHeaderFactory, PanelHeaderFactory];
}
