"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const callbackUrl =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("callbackUrl") || "/"
      : "/";

  // Social Login Success Toast এর জন্য URL
  const socialCallbackUrl = `${callbackUrl}${
    callbackUrl.includes("?") ? "&" : "?"
  }socialLogin=success`;

  // Email + Password Sign In
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setError(false);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      console.log("FULL SIGNIN ERROR:", error);

      setMessage(error.message || "Sign In করা যায়নি!");
      setError(true);

      toast.error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়!", {
        duration: 3000,
      });

      return;
    }

    toast.success("সফলভাবে Sign In হয়েছে! ", {
      duration: 2000,
    });

    setMessage("সফলভাবে Sign In হয়েছে!");
    setError(false);

    setTimeout(() => {
      window.location.href = callbackUrl;
    }, 800);
  }

  // Google Sign In
  async function handleGoogleSignIn() {
    setMessage("");
    setError(false);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: socialCallbackUrl,
    });

    if (error) {
      console.log("GOOGLE LOGIN ERROR:", error);

      setMessage(error.message || "Google দিয়ে Sign In করা যায়নি!");
      setError(true);

      toast.error("Google দিয়ে Sign In করা যায়নি!", {
        duration: 3000,
      });
    }
  }

  // GitHub Sign In
  async function handleGitHubSignIn() {
    setMessage("");
    setError(false);

    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: socialCallbackUrl,
    });

    if (error) {
      console.log("GITHUB LOGIN ERROR:", error);

      setMessage(error.message || "GitHub দিয়ে Sign In করা যায়নি!");
      setError(true);

      toast.error("GitHub দিয়ে Sign In করা যায়নি!", {
        duration: 3000,
      });
    }
  }

  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#f1f6f2] px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">সাইন ইন করুন</h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            আপনার বাজারদর অ্যাকাউন্টে প্রবেশ করুন।
          </p>
        </div>

        {/* Email & Password */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              ইমেইল
            </label>

            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              type="password"
              placeholder="আপনার পাসওয়ার্ড"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Message */}
          {message && (
            <p
              role="status"
              className={`rounded-lg p-3 text-sm ${
                error ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"
              }`}
            >
              {message}
            </p>
          )}

          {/* Sign In */}
          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            সাইন ইন করুন
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-sm text-gray-500">অথবা</span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google & GitHub */}
        <div className="grid grid-cols-2 gap-3">
          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <svg
              viewBox="0 0 48 48"
              className="h-5 w-5 shrink-0"
              aria-hidden="true"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.5 0 6.7 1.2 9.2 3.6l6.8-6.8C35.9 2.4 30.5 0 24 0 14.6 0 6.5 5.4 3 13.2l8 6.2C12.9 13.7 18.1 9.5 24 9.5Z"
                transform="translate(0 4)"
              />

              <path
                fill="#4285F4"
                d="M47 24.5c0-1.6-.2-3.1-.4-4.5H24v9h12.9c-.6 3-2.3 5.5-4.8 7.2l7.8 6C44.4 38 47 31.9 47 24.5Z"
              />

              <path
                fill="#FBBC05"
                d="M11 28.6A14.4 14.4 0 0 1 10.3 24c0-1.6.3-3.1.7-4.6l-8-6.2A23.9 23.9 0 0 0 0 24c0 3.9 1 7.5 3 10.8Z"
                transform="translate(1 0)"
              />

              <path
                fill="#34A853"
                d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.8-6c-2.1 1.4-4.9 2.3-8.1 2.3-6 0-11.2-4.2-13-9.9l-8 6.2C6.5 42.6 14.6 48 24 48Z"
              />
            </svg>

            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          {/* GitHub */}
          <button
            type="button"
            onClick={handleGitHubSignIn}
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 fill-current"
              aria-hidden="true"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.2.8-.6v-2.1c-3.4.7-4.1-1.4-4.1-1.4-.5-1.3-1.2-1.6-1.2-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.2 1.2 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.4-5.5-6.1 0-1.4.5-2.5 1.2-3.4-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.6 1.3a12.4 12.4 0 0 1 6.6 0c2.5-1.6 3.6-1.3 3.6-1.3.7 1.7.3 3 .2 3.3.8.9 1.2 2 1.2 3.4 0 4.7-2.8 5.8-5.5 6.1.4.4.7 1 .7 2v3c0 .4.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" />
            </svg>

            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Sign Up */}
        <p className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-700 hover:underline"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>

        {/* Back Home */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-green-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
