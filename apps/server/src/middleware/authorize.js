/**
 * ==============================================================================
 * ATTRAVOYA MIDDLEWARE - ROLE AUTHORIZATION
 * ==============================================================================
 * This middleware works in tandem with our authentication guard. It restricts
 * access to endpoints based on the traveler's assigned Role (e.g., blocking
 * standard travelers from accessing admin configuration screens).
 */

export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
    // 1. Verify user session has already been established by the authenticate guard
    if (!req.user) {
        const error = new Error("Session authentication must be verified before checking role clearances.");
      error.statusCode = 500; // Internal server configuration error
        return next(error);
    }

    // 2. Check if the user's role is included in our allowed permissions list
    const isAuthorized = allowedRoles.includes(req.user.role);

    if (!isAuthorized) {
        const error = new Error(`Access Denied: Your account role is '${req.user.role}', but this section requires higher clearance.`);
      error.statusCode = 403; // Forbidden
        return next(error);
    }

    next(); // Access cleared!
    };
};

export default authorize;