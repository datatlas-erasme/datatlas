import {ModalDialogFactory as KeplerModalDialogFactory} from '@kepler.gl/components';
import {StyledModal} from '../../../Modal';

const ModalDialogFactory = () => StyledModal;

ModalDialogFactory.deps = [];

export function replaceModalDialog() {
  return [KeplerModalDialogFactory, ModalDialogFactory];
}
