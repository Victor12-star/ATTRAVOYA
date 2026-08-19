/**
 * ==============================================================================
 * ATTRAVOYA MIDDLEWARE - REQUEST DATA VALIDATOR
 * ==============================================================================
 * This middleware intercepts incoming request bodies, query params, or headers
 * and validates them against a given Zod schema. If the validation fails, Zod
 * generates formatted error messages, and this middleware immediately returns a
 * clean 400 Bad Request response to the user.
 */

export const validate = (schema) => (req, res, next) => {
    try {
    // Parse req.body against our Zod schema
    schema.parse(req.body);
    next(); // Valid! Proceed to the controller
    } catch (error) {
    // If Zod validation fails, format and map the errors neatly
    const formattedErrors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message
    }));

    // Immediately stop request and return 400 Bad Request
    res.status(400).json({
        success: false,
        statusCode: 400,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        message: "Data validation failed. Please check your inputs.",
        errors: formattedErrors
    });
    }
};

export default validate;