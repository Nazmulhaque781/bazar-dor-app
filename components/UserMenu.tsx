"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

type UserMenuProps = {
  name: string;
  email: string;
};

export default function UserMenu({ name, email }: UserMenuProps) {
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("সাইন আউট করা যায়নি!");
      return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছে!");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 transition hover:bg-gray-100"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
          👤
        </span>

        <span className="hidden max-w-[120px] truncate text-sm font-medium text-gray-700 sm:block">
          {name}
        </span>

        <span className="text-gray-500">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
          <div className="border-b border-gray-100 px-3 py-3">
            <p className="font-semibold text-gray-900">{name}</p>

            <p className="mt-1 truncate text-xs text-gray-500">{email}</p>
          </div>

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            👤 Profile
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            ↪ Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
