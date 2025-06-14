import { FaEnvelope, FaLock } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { emailLogin } from "../auth/actions";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (errorType: string | null) => {
    switch (errorType) {
      case "validation":
        return "Please check your email and password format.";
      case "auth":
        return "Invalid email or password. Please try again.";
      case "network":
        return "Connection error. Please try again.";
      default:
        return null;
    }
  };

  const errorMessage = getErrorMessage(error);

  return (
    <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Please sign in to your account</p>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <form className="mt-8 space-y-6">
        <div className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope color="#9896B5" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              className={`appearance-none rounded-xl pl-10 relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                error === "validation"
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Email address"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock color="#9896B5" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              className={`appearance-none rounded-xl pl-10 relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                error === "validation"
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Password"
            />
          </div>
        </div>

        <button
          formAction={emailLogin}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Sign in
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-[1.02] cursor-pointer"
            >
              <FcGoogle size={20} />
              <span className="ml-2">Google</span>
            </button>

            <button
              type="button"
              className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-[1.02] cursor-pointer"
            >
              <FaGithub size={20} />
              <span className="ml-2">GitHub</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
