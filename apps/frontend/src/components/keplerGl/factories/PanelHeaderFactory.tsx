import { PanelHeaderFactory as KeplerPanelHeaderFactory } from 'kepler.gl/components';

const PanelHeaderFactory = () => {
  return () => null;
};

PanelHeaderFactory.deps = KeplerPanelHeaderFactory.deps;
//deps : variable statique, stocker tout les arguments de la fonction =>  Injection de dépendence
export function replacePanelHeader() {
  return [KeplerPanelHeaderFactory, PanelHeaderFactory];
}
