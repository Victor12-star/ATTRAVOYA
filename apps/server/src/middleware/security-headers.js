/**
 * ==============================================================================
 * ATTRAVOYA MIDDLEWARE - CONTENT SECURITY POLICY (CSP) HEADERS
 * ==============================================================================
 * Adds explicit visual policies to stop Clickjacking, XSS injection frames,
 * and MIME-sniffing.
 */

export const securityHeaders = (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff"); // Blocks MIME sniffing attacks
  res.setHeader("X-Frame-Options", "DENY");            // Blocks Clickjacking (hiding our site inside an invisible iframe)
  res.setHeader("X-XSS-Protection", "1; mode=block");  // Enforces XSS protection filters in older browsers
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
};