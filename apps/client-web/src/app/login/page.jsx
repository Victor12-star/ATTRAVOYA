/**
 * ==============================================================================
 * ATTRAVOYA WEB PAGE - LOGIN
 * ==============================================================================
 * Renders our accessible login form.
 */

"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LoginForm } from "../../components/forms/LoginForm.jsx";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "true";

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md flex flex-col gap-6">
        
        {/* Success signup alert banner */}
        {justRegistered && (
          <div role="alert" className="p-4 bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-bold text-sm rounded-2xl text-center">
            🎉 Registration successful! Please sign in using your new credentials.
          </div>
        )}

        <LoginForm />

        <p className="text-sm text-center text-slate-500">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary font-bold hover:underline focus:ring-1 focus:ring-primary rounded">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
