/**
 * ==============================================================================
 * ATTRAVOYA CHATBOT - PROMPT INJECTION SHIELD
 * ==============================================================================
 * Inspects incoming traveler prompts in real-time, blocking suspicious
 * injection strings (like "ignore previous", "act as admin", "bypass rules")
 * to prevent unauthorized LLM system exploits.
 */

import { logger } from "../../config/logger.js";

// List of banned attack terms (Regex-based matches)
const BANNED_PATTERNS = [
    "ignore previous",
    "system prompt",
    "ignore instructions",
    "developer mode",
    "act as a",
    "override rules",
    "sql injection",
  "select * from"
];

export const inspectPromptSafety = (promptText) => {
    const normalized = promptText.toLowerCase().trim();

    for (const pattern of BANNED_PATTERNS) {
    if (normalized.includes(pattern)) {
        logger.warn(`⚠️ SECURITY BREACH DETECTED: Blocked prompt injection exploit: "${promptText}"`);
      return false; // Dangerous prompt! Trigger security guard block
    }
    }

  return true; // Clean prompt
};