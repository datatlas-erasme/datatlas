import {ContainerFactory} from '@kepler.gl/components';
import {appInjector} from './injector';

export const KeplerGl = appInjector.get(ContainerFactory);
