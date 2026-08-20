/**
 * ==============================================================================
 * ATTRAVOYA CHATBOT - SERVICE LAYER
 * ==============================================================================
 * Connects our controllers to our AI provider. Fetches the active city's
 * geographic travel guides dynamically, appending it as a hidden system context
 * on the backend so that our chatbot answers with deep, highly accurate local info.
 */

import { AiProvider } from "./providers/ai.provider.js";
import { inspectPromptSafety } from "./chat-safety.service.js";
import { getDetailedGuideBySlug } from "../destinations/destination.service.js";
import { logger } from "../../config/logger.js";

const ai = new AiProvider();

export const generateChatResponse = async (messages, activeSlug = null) => {
  // 1. Cyber-security Audit: Inspect the last message for prompt injection
    const lastMessage = messages[messages.length - 1];
    const isSafe = inspectPromptSafety(lastMessage.content);
    
    if (!isSafe) {
    return {
        role: "assistant",
        content: "⚠️ Safety Alert: Your request has been flagged by AttraVoya's security firewall. Please keep conversations related to travel."
    };
    }

  // 2. Fetch destination guide context on the backend
    let guideContext = null;
    if (activeSlug) {
    try {
        guideContext = await getDetailedGuideBySlug(activeSlug);
    } catch (e) {
        logger.warn(`Could not load context for slug '${activeSlug}' during chat:`, e.message);
    }
    }

  // 3. Query the AI provider
    const responseContent = await ai.generateCompletion(messages, guideContext);

    return {
    role: "assistant",
    content: responseContent
    };
};