import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  confirmLabel?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning';
  icon?: 'trash' | 'warning';
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  title,
  message,
  confirmText,
  confirmLabel,
  cancelText = 'Abbrechen',
  variant = 'danger',
  icon = 'trash'
}: ConfirmDialogProps) {
  const handleClose = onClose || onCancel || (() => {});
  const buttonText = confirmText || confirmLabel || 'Löschen';
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const IconComponent = icon === 'trash' ? Trash2 : AlertTriangle;
  const iconColor = variant === 'danger' ? 'text-red-500' : 'text-orange-500';
  const iconBgColor = variant === 'danger'
    ? 'bg-gradient-to-br from-red-500/20 to-red-600/10 border-red-500/20'
    : 'bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/20';

  const dialogContent = (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflow: 'auto'
      }}
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-[420px]"
        style={{ margin: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '2px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="px-6 pt-10 pb-6 text-center">
            <div className="mb-6">
              <div
                className={`w-24 h-24 mx-auto mb-6 rounded-full ${iconBgColor} border-2 flex items-center justify-center`}
                style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)' }}
              >
                <IconComponent size={48} className={iconColor} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {title}
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed px-2">
                {message}
              </p>
            </div>

            <div className="space-y-3 mt-8">
              <button
                onClick={handleConfirm}
                className={`w-full rounded-xl font-bold text-lg transition-all duration-200 active:scale-95 ${
                  variant === 'danger'
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
                style={{
                  height: '56px',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)'
                }}
              >
                {buttonText}
              </button>

              <button
                onClick={handleClose}
                className="w-full rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-gray-900 dark:text-white font-bold text-lg transition-all duration-200 active:scale-95"
                style={{ height: '56px' }}
              >
                {cancelText}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="absolute bg-gray-900 hover:bg-black flex items-center justify-center text-white transition-all hover:scale-110"
          style={{
            top: '-12px',
            right: '-12px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            border: '3px solid white'
          }}
          aria-label="Schließen"
        >
          <X size={24} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
}
