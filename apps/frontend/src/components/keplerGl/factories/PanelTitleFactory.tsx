import {PanelTitleFactory as KeplerPanelTitleFactory} from '@kepler.gl/components';
import {Factory} from '@kepler.gl/components/dist/injector';

const PanelTitleFactory = () => () => null;

export function replacePanelTitle(): [Factory, Factory] {
  // @ts-ignore
  return [KeplerPanelTitleFactory, PanelTitleFactory];
}
