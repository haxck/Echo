import React from 'react';
import Modal from './Modal';
import ModalContent from './ModalContent';

const CommonModal = ({ isOpen, title, content, onClose, buttons }) => {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      buttons={buttons}
    >
      <ModalContent content={content} />
    </Modal>
  );
};

export default CommonModal; 