import React from 'react';
import Modal from 'react-modal';
import FileUpload from 'kepler.gl/dist/components/common/file-uploader/file-upload';

interface LogoImportModalInterface {
  title: string | null;
  open: boolean;
  onClose: () => void;
}
export const LogoImportModal = ({ open }: LogoImportModalInterface) => {
  return (
    <Modal isOpen={open} ariaHideApp={false}>
      <FileUpload />
    </Modal>
  );
};
