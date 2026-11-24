'use client'
import { createContext, useCallback, useState, type ReactNode } from "react";
import { ConfirmModal } from "@/app/components/ConfirmModal";

interface ModalContextType {
  confirm: (message: string) => Promise<boolean>;
}

interface ModalState {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const closedState: ModalState = { isOpen: false, message: '', onConfirm: () => {}, onCancel: () => {} };

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>(closedState);

  const showConfirm = useCallback((message: string) => {
    return new Promise<boolean>((resolve) => {
      setModalState({
        isOpen: true,
        message,
        onConfirm: () => {
          setModalState(closedState);
          resolve(true);
        },
        onCancel: () => {
          setModalState(closedState);
          resolve(false);
        },
      });
    });
  }, []);

  return (
    <ModalContext.Provider value={{ confirm: showConfirm }}>
      {children}
      {modalState.isOpen && (
        <ConfirmModal message={modalState.message} onConfirm={modalState.onConfirm} onCancel={modalState.onCancel} />
      )}
    </ModalContext.Provider>
  );
};
