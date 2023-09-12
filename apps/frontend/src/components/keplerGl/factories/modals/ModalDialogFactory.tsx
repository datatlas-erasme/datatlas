import { ModalDialogFactory as KeplerModalDialogFactory } from 'kepler.gl/dist/components';
import { StyledModal } from '../../../Modal';

const ModalDialogFactory = () => StyledModal;

ModalDialogFactory.deps = KeplerModalDialogFactory.deps;

export function replaceModalDialog() {
  return [KeplerModalDialogFactory, ModalDialogFactory];
}
