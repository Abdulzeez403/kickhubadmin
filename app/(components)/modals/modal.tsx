// components/Modal.tsx
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: "-50%" }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? "0%" : "-50%" }}
        transition={{ type: "spring", duration: 0.5 }}
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-50`}
      >
        {/* Modal content */}
        <div className="relative">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={onClose}
          >
            Close
          </button>
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default Modal;
