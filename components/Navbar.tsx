import Link from "next/link";
import { headers } from "next/headers";
import { connection } from "next/server";

import { getProducts } from "@/lib/api";
import { auth } from "@/lib/auth";
import PriceTicker from "@/components/PriceTicker";
import UserMenu from "@/components/UserMenu";

export const instant = false;

export default async function Navbar() {
  await connection();

  const products = await getProducts();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Top Row */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo-icon.png"
              alt="বাজার দর"
              className="h-12 w-auto bg-green-700"
            />

            <div>
              <h1 className="text-xl font-bold text-gray-900">বাজার দর</h1>

              <p className="text-xs text-gray-500">
                শুক্রবার, ০৯ অক্টোবর, ২০২৬
              </p>
            </div>
          </Link>

          {/* Auth / Profile */}
          <div className="flex items-center gap-2">
            {session?.user ? (
              <UserMenu
                name={session.user.name || "User"}
                email={session.user.email}
              />
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Category Navigation */}
        <nav className="flex gap-6 overflow-x-auto border-t border-gray-100 py-3">
          <Link
            href="/category/chal"
            className="whitespace-nowrap text-gray-600 hover:text-green-600"
          >
            🍚 চাল
          </Link>

          <Link
            href="/category/dal"
            className="whitespace-nowrap text-gray-600 hover:text-green-600"
          >
            🫘 ডাল
          </Link>

          <Link
            href="/category/tel"
            className="whitespace-nowrap text-gray-600 hover:text-green-600"
          >
            🛢️ তেল
          </Link>

          <Link
            href="/category/sobji"
            className="whitespace-nowrap text-gray-600 hover:text-green-600"
          >
            🥬 সবজি
          </Link>

          <Link
            href="/category/mach"
            className="whitespace-nowrap text-gray-600 hover:text-green-600"
          >
            🐟 মাছ
          </Link>

          <Link
            href="/category/mangsho"
            className="whitespace-nowrap text-gray-600 hover:text-green-600"
          >
            🍗 মাংস
          </Link>

          <Link
            href="/category/dim-dui"
            className="whitespace-nowrap text-gray-600 hover:text-green-600"
          >
            🥛 ডিম-দুধ
          </Link>

          <Link
            href="/category/mosla"
            className="whitespace-nowrap text-gray-600 hover:text-green-600"
          >
            🌶️ মসলা
          </Link>
        </nav>
      </div>

      {/* Price Ticker */}
      <PriceTicker products={products} />
    </header>
  );
}
