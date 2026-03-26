'use client';

import { motion, AnimatePresence } from 'motion/react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText
}: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-surface border border-border-subtle w-full max-w-md rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h3 className="text-white font-display text-xl md:text-2xl">{title}</h3>
                </div>
                
                <p className="text-textMuted mb-8 leading-relaxed">
                  {message}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 rounded-xl border border-border-subtle text-white hover:bg-white/5 transition-colors font-medium"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    className="flex-1 px-6 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors font-bold shadow-lg shadow-red-500/20"
                  >
                    {confirmText}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
