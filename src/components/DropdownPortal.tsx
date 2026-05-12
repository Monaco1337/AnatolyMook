import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface DropdownPortalProps {
  isOpen: boolean;
  buttonRef: React.RefObject<HTMLButtonElement>;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children: React.ReactNode;
  navBg: string;
  navBorder: string;
  navShadow: string;
}

export default function DropdownPortal({
  isOpen,
  buttonRef,
  onClose,
  onMouseEnter,
  onMouseLeave,
  children,
  navBg,
  navBorder,
  navShadow
}: DropdownPortalProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    const updatePosition = () => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        setPosition({
          top: rect.bottom + 8,
          left: rect.left
        });
      }
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, buttonRef]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, buttonRef]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 999999,
        minWidth: '200px',
        background: navBg,
        backdropFilter: 'blur(60px) saturate(180%)',
        WebkitBackdropFilter: 'blur(60px) saturate(180%)',
        border: navBorder,
        boxShadow: `${navShadow}, 0 20px 40px rgba(0, 0, 0, 0.15)`,
        borderRadius: '12px',
        overflow: 'hidden',
        animation: 'dropdownFadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        transformOrigin: 'top center'
      }}
    >
      <style>{`
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
      <div className="py-2">
        {children}
      </div>
    </div>,
    document.body
  );
}
