import {PanelHeaderFactory as KeplerPanelHeaderFactory} from '@kepler.gl/components';

PanelHeaderFactory.deps = [];

function PanelHeaderFactory() {
  return () => null;
}

export function replacePanelHeader() {
  return [KeplerPanelHeaderFactory, PanelHeaderFactory];
}
