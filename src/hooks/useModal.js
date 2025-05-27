import { useState } from 'react';

export const useModal = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (modalType, title, content) => {
    setActiveModal(modalType);
    setModalContent(content);
    setModalTitle(title);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalContent('');
    setModalTitle('');
  };

  return {
    activeModal,
    modalContent,
    modalTitle,
    openModal,
    closeModal
  };
}; 