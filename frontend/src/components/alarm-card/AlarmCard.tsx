import React, { ReactNode } from "react";
import "./AlarmCard.css";

interface ModalProps {
  onClose: () => void;
  children?: ReactNode;
}

const AlarmModal: React.FC<ModalProps> = ({ onClose, children }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={closeModal}>Fermer</button>
      </div>
    </div>
  );
};

export default AlarmModal;
