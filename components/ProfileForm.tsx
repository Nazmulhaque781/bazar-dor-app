"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

type Props = {
  currentName: string;
};

export default function ProfileForm({ currentName }: Props) {
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("নাম লিখুন!");
      return;
    }

    if (trimmedName === currentName) {
      toast("নামে কোনো পরিবর্তন করা হয়নি!");
      return;
    }

    setLoading(true);

    const { error } = await authClient.updateUser({
      name: trimmedName,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "নাম আপডেট করা যায়নি!");
      return;
    }

    toast.success("নাম সফলভাবে আপডেট হয়েছে!");

    setTimeout(() => {
      window.location.reload();
    }, 700);
  }

  async function handleSignOut() {
    await authClient.signOut();

    toast.success("সফলভাবে সাইন আউট হয়েছে!");

    setTimeout(() => {
      window.location.href = "/";
    }, 700);
  }

  return (
    <div className="mt-8">
      <form onSubmit={handleUpdate}>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          নাম পরিবর্তন করুন
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-lg bg-[#2f6b3c] px-4 py-3 font-medium text-white transition hover:bg-[#275b32] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
        </button>
      </form>

      <button
        type="button"
        onClick={handleSignOut}
        className="mt-4 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-medium text-red-600 transition hover:bg-red-100"
      >
        ↩ সাইন আউট
      </button>
    </div>
  );
}
