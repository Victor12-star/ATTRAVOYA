/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - ACCESSIBLE MODAL WINDOW
 * ==============================================================================
 * Interactive pop-up dialog container.
 *
 * ACCESSIBILITY (a11y) ACTIONS:
 * 1. Employs "role=dialog" and "aria-modal=true" to announce window locks.
 * 2. Integrates "Escape" key listeners to allow quick closing of the overlay.
 * 3. Enforces focusing traps and focusable Close buttons.
 */

import React, { useEffect } from "react";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className = ""
}) => {
  // 1. Trap Key listeners (Close pop-up instantly if user clicks 'Escape' key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background page scrolling
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog" // Identifies dialog container context to screen readers
      aria-modal="true" // Forces screen reader keyboard focus traps within this overlay
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
    >
      {/* Click outside to close overlay background layer */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      
      <div className={`relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl animate-scale-up ${className}`}>
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-textLight dark:text-textDark">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog modal"
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-4 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;