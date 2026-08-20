/**
 * ==============================================================================
 * ATTRAVOYA WEB PAGE - REGISTER
 * ==============================================================================
 * Renders our accessible sign-up form.
 */

"use client";

import React from "react";
import Link from "next/link";
import { RegisterForm } from "../../components/forms/RegisterForm.jsx";

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md flex flex-col gap-6">
        
        {/* Render register card form */}
        <RegisterForm />

        <p className="text-sm text-center text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline focus:ring-1 focus:ring-primary rounded">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
