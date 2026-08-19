/**
 * ==============================================================================
 * ATTRAVOYA WEB CLIENT - DYNAMIC ERROR BOUNDARY
 * ==============================================================================
 * Global error fallback page. Next.js automatically mounts this client component
 * if any page crashes during client-side execution, preventing the whole site from freezing.
 */

"use client";

import React, { useEffect } from "react";
import { Button } from "../components/ui/Button.jsx";

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    // Log error internally for developer auditing
    console.error("Next.js Error Boundary caught an exception:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto gap-5">
      <div className="p-4 bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-full" aria-hidden="true">
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
        Oops! Something went wrong on this page
      </h1>
      
      <p className="text-base text-slate-500 dark:text-slate-400">
        We apologize for the inconvenience. Our server encountered a slight bump. You can try reloading this specific page or navigate back to the homepage.
      </p>

      {error?.message && (
        <pre className="text-xs text-red-500 bg-red-50 dark:bg-red-950/10 p-3 rounded-lg font-mono max-w-full overflow-x-auto text-left">
          Error Message: {error.message}
        </pre>
      )}

      <div className="flex gap-4">
        {/* Reset button attempts to recover/reload the failing component */}
        <Button onClick={reset} variant="primary">
          Reload Page
        </Button>
        <Button onClick={() => window.location.href = "/"} variant="ghost">
          Go back Home
        </Button>
      </div>
    </div>
  );
}