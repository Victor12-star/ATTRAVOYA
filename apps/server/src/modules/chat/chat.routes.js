/**
 * ==============================================================================
 * ATTRAVOYA CHATBOT - ROUTER
 * ==============================================================================
 * Maps POST /api/chat requests.
 */

import { Router } from "express";
import { sendMessage } from "./chat.controller.js";

export const chatRoutes = Router();

// POST /api/chat
chatRoutes.post("/", sendMessage);

export default chatRoutes;