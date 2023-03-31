import { PanelTitleFactory as KeplerPanelTitleFactory } from 'kepler.gl/components';

const PanelTitleFactory = () => {
  return () => null;
};

PanelTitleFactory.deps = KeplerPanelTitleFactory.deps;
//deps : variable statique, stocker tout les arguments de la fonction =>  Injection de dépendence
export function replacePanelTitle() {
  return [KeplerPanelTitleFactory, PanelTitleFactory];
}
