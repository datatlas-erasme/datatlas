import {ModalDialogFactory as KeplerModalDialogFactory} from '@kepler.gl/components';
import {Factory} from '@kepler.gl/components/dist/injector';
import {StyledModal} from '../../../Modal';

const ModalDialogFactory = () => StyledModal;

ModalDialogFactory.deps = [];

export function replaceModalDialog(): [Factory, Factory] {
  // @ts-ignore
  return [KeplerModalDialogFactory, ModalDialogFactory];
}
