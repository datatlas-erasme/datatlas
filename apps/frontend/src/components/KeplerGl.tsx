import { injectComponents, SidePanelFactory as KeplerSidePanelFactory, Icons } from 'kepler.gl/components';
import { SidePanelFactory } from './SidePanelFactory';

export const KeplerGl = injectComponents([[KeplerSidePanelFactory, SidePanelFactory]]);
