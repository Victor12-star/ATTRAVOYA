/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - CHAT MESSAGE BUBBLE
 * ==============================================================================
 * Renders individual messages inside our AI assistant conversation log.
 * Enforces strong background/text contrast to aid travelers with low vision.
 */

import React from "react";

export const ChatMessage = ({ message }) => {
    const isUser = message.role === "user";

    return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
        <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm font-semibold shadow-sm leading-relaxed ${
            isUser
            ? "bg-primary text-slate-950 rounded-br-none"
            : "bg-slate-100 dark:bg-slate-800 text-textLight dark:text-textDark rounded-bl-none border border-slate-200/40 dark:border-slate-700/60"
        }`}
        >
        <p>{message.content}</p>
        <span className="text-[10px] text-slate-400 block mt-1 text-right font-mono">
            {message.role === "user" ? "You" : "AttraVoya AI"}
        </span>
        </div>
    </div>
    );
};

export default ChatMessage;