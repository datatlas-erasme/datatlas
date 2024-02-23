import {PanelHeaderFactory as KeplerPanelHeaderFactory} from '@kepler.gl/components';
import {Factory} from '@kepler.gl/components/dist/injector';

PanelHeaderFactory.deps = [];

function PanelHeaderFactory() {
  return () => null;
}

export function replacePanelHeader(): [Factory, Factory] {
  // @ts-ignore
  return [KeplerPanelHeaderFactory, PanelHeaderFactory];
}
