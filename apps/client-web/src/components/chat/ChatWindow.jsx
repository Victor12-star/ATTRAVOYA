/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - AI ASSISTANT CHAT WINDOW
 * ==============================================================================
 * Accessible chat console overlay.
 *
 * ACCESSIBILITY (a11y) ACTIONS:
 * 1. Uses "aria-live=assertive" so that incoming AI responses are voiced
 *    instantly to visually impaired visitors.
 * 2. Flat semantic forms with visible placeholders.
 * 3. Incorporates automatic scroll-locks to focus traveler's view on active logs.
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { apiClient } from "../../lib/api-client.js";
import { ChatMessage } from "./ChatMessage.jsx";
import { Button } from "../ui/Button.jsx";

export const ChatWindow = ({ isOpen, onClose }) => {
  const pathname = usePathname(); // Allows us to read which city guide is currently viewed!
    const [messages, setMessages] = useState([
    {
        role: "assistant",
        content: "Aloha! Bonjour! Hej! I am your AttraVoya AI Travel Assistant. Ask me anything about flights, hotels, beaches, safety warnings, or translated phrasebooks!"
    }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    
    const chatEndRef = useRef(null);

  // 1. Determine active city slug context dynamically from the URL
  // E.g. if pathname is '/destinations/honolulu', activeSlug becomes 'honolulu'
    const getActiveSlugContext = () => {
    const parts = pathname.split("/");
    const destIndex = parts.indexOf("destinations");
    if (destIndex !== -1 && parts[destIndex + 1]) {
        return parts[destIndex + 1];
    }
    return null;
    };

  // 2. Keep chat automatically scrolled to the latest message bubble
    useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    if (!isOpen) return null;

    const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage = { role: "user", content: inputValue.trim() };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInputValue("");
    setLoading(true);

    const activeSlug = getActiveSlugContext();

    try {
      // Post current conversation log and city context to Express server
        const response = await apiClient.post("/chat", {
        messages: updatedMessages,
        activeSlug
        });
        if (response.success && response.message) {
        setMessages((prev) => [...prev, response.message]);  
            }
    } catch (err) {
        setMessages((prev) => [
        ...prev,
        {
            role: "assistant",
            content: "⚠️ I encountered an issue connecting to my travel mind logs. Please check your network and try again."
        }
        ]);
    } finally {
        setLoading(false);
    }
    };

    return (
    <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scale-up">
        
      {/* 1. Chat Header */}
        <div className="p-4 bg-primary text-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">🤖</span>
            <div>
            <h3 className="font-extrabold text-base leading-none">AttraVoya AI</h3>
            <span className="text-[10px] font-bold opacity-75">Travel Assistant</span>
            </div>
        </div>
        <button
            onClick={onClose}
            aria-label="Close AI Travel Assistant Chat"
            className="p-1.5 rounded-full hover:bg-slate-950/10 focus:outline-none focus:ring-2 focus:ring-slate-950"
        >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        </div>

      {/* 2. Message History Box */}
        <div 
        aria-live="assertive" // Instantly reads incoming AI text replies
        className="flex-grow p-4 overflow-y-auto flex flex-col gap-4 bg-slate-50/50 dark:bg-slate-900/30"
        >
        {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
        ))}

        {/* Animated typing dots */}
        {loading && (
            <div className="flex justify-start animate-pulse" aria-hidden="true">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3 flex gap-1">
                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" />
                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
            </div>
        )}
        <div ref={chatEndRef} />
        </div>

      {/* 3. Input Text Bar Form */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2 bg-white dark:bg-slate-900">
        <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about safety, weather, beaches..."
            disabled={loading}
            className="flex-grow px-4 py-2.5 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800/50 border-slate-150 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-900 transition-all"
        />
        <Button
            type="submit"
            disabled={!inputValue.trim() || loading}
            ariaLabel="Send message to AI travel assistant"
            className="px-4 py-2 text-sm rounded-xl flex-shrink-0"
        >
            Send
        </Button>
        </form>
    </div>
    );
};

export default ChatWindow;