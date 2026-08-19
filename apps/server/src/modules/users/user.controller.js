/**
 * ==============================================================================
 * ATTRAVOYA SERVER USERS - CONTROLLER LAYER
 * ==============================================================================
 * Connects Express requests with user services to fetch profiles and update settings.
 * Sensitive password hashes and MFA secrets are strictly stripped out of response bodies.
 */

import { getUserById, updateUserSettings } from "./user.service.js";
import { asyncHandler } from "../../lib/async-handler.js";

/**
 * GET /api/users/profile
 * Retrieves detailed, fresh profile parameters of the logged-in traveler
 */
export const getProfile = asyncHandler(async (req, res) => {
  // Current user ID was decrypted and appended by the authenticate guard on req.user.id
    const traveler = await getUserById(req.user.id);
    
    if (!traveler) {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Your profile details could not be found."
    });
    return;
    }

  // Strip confidential password hashes before returning JSON payload
    const { passwordHash, mfaSecret, ...safeUser } = traveler;

    res.status(200).json({
    success: true,
    user: safeUser
    });
});

/**
 * PUT /api/users/update
 * Updates custom travel configurations and settings
 */
export const updateProfile = asyncHandler(async (req, res) => {
    const updatedTraveler = await updateUserSettings(req.user.id, req.body);

    const { passwordHash, mfaSecret, ...safeUser } = updatedTraveler;

    res.status(200).json({
    success: true,
    message: "Your profile settings have been updated successfully!",
    user: safeUser
    });
});