/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - FLOATING CHAT BUTTON
 * ==============================================================================
 * Renders a sticky floating chat bubble in the bottom-right corner of the viewport.
 * When clicked, it toggles our accessible AI Travel Assistant drawer window.
 */

"use client";

import React from "react";
import { Button } from "../ui/Button.jsx";

export const ChatButton = ({ onClick, isOpen }) => {
    return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
        <Button
        variant="primary"
        onClick={onClick}
        ariaLabel={isOpen ? "Close AI Travel Assistant" : "Open AttraVoya AI Travel Assistant"}
        className="h-14 w-14 rounded-full shadow-2xl flex items-center justify-center text-2xl hover:scale-105 transition-all focus:ring-2 focus:ring-offset-2"
        >
        {isOpen ? (
          // Close Icon
            <svg className="h-6 w-6 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
        ) : (
          // Speak / Robot Chat Icon
            <svg className="h-7 w-7 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        )}
        </Button>
    </div>
    );
};

export default ChatButton;