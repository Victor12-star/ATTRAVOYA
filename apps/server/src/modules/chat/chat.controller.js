/**
 * ==============================================================================
 * ATTRAVOYA CHATBOT - CONTROLLER LAYER
 * ==============================================================================
 * Resolves Express request bodies for AI conversation queries, passing active
 * page parameters to enable context-aware replies.
 */

import { generateChatResponse } from "./chat.service.js";
import { asyncHandler } from "../../lib/async-handler.js";

/**
 * POST /api/chat
 * Sends message logs and active city slug context to get AI replies
 */
export const sendMessage = asyncHandler(async (req, res) => {
    const { messages, activeSlug } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Chat messages stream is required."
    });
    return;
    }

    const aiReply = await generateChatResponse(messages, activeSlug);

    res.status(200).json({
    success: true,
    message: aiReply
    });
});