"use client";

import { Suspense } from "react";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}

export default LoginPage;
