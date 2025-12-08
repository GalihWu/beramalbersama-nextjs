'use client';

import React, { createContext, useContext, useState } from 'react';
import ConfirmationModal from '@/components/ui/modal/modalKonfirmation';

interface ConfirmationModalContextType {
  showModal: (config: ConfirmationModalConfig) => void;
  hideModal: () => void;
}

interface ConfirmationModalConfig {
  type: 'success' | 'warning' | 'danger';
  title: string;
  message: string;
  onConfirm: () => void;
  textConfirm?: string;
}

const ConfirmationModalContext =
  createContext<ConfirmationModalContextType | null>(null);

export const ConfirmationModalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] =
    useState<ConfirmationModalConfig | null>(null);

  const showModal = (config: ConfirmationModalConfig) => {
    setModalConfig(config);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    setModalConfig(null);
  };

  return (
    <ConfirmationModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalConfig && (
        <ConfirmationModal
          type={modalConfig.type}
          title={modalConfig.title}
          message={modalConfig.message}
          onConfirm={modalConfig.onConfirm}
          onClose={hideModal}
          isOpen={isOpen}
          textConfirm={modalConfig.textConfirm}
        />
      )}
    </ConfirmationModalContext.Provider>
  );
};

export const useConfirmationModal = () => {
  const context = useContext(ConfirmationModalContext);
  if (!context) {
    throw new Error(
      'useConfirmationModal must be used within a ConfirmationModalProvider'
    );
  }
  return context;
};
