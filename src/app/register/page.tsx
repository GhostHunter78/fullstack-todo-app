"use client";

import { Suspense } from "react";
import SignUpForm from "../components/SignUpForm";

function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <Suspense>
        <SignUpForm />
      </Suspense>
    </div>
  );
}

export default RegisterPage;
