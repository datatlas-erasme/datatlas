import { ContainerFactory } from 'kepler.gl/dist/components/container';
import { appInjector } from './injector';

export const KeplerGl = appInjector.get(ContainerFactory);
