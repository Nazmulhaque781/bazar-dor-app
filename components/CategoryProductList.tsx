"use client";

import Link from "next/link";
import { useState } from "react";

type Product = {
  id: number;
  nameBn: string;
  image?: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

type Props = {
  products: Product[];
  categoryIcon: string;
  categoryName: string;
};

export default function CategoryProductList({
  products,
  categoryIcon,
  categoryName,
}: Props) {
  const [sort, setSort] = useState("default");

  const toNumber = (value: number | string) => {
    const banglaDigits = "০১২৩৪৫৬৭৮৯";

    return Number(
      String(value)
        .replace(/[০-৯]/g, (digit) => String(banglaDigits.indexOf(digit)))
        .replace(/,/g, ""),
    );
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") {
      return toNumber(a.today) - toNumber(b.today);
    }

    if (sort === "high") {
      return toNumber(b.today) - toNumber(a.today);
    }

    return 0;
  });

  return (
    <div>
      {/* Category Header + Sort */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {categoryIcon} {categoryName}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex shrink-0 items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-600">
            সাজান
          </label>

          <div className="relative">
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-9 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">দাম: কম থেকে বেশি</option>
              <option value="high">দাম: বেশি থেকে কম</option>
            </select>

            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m6 9 6 6 6-6"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      {sortedProducts.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-lg font-semibold text-gray-700">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>

          <p className="mt-2 text-sm text-gray-500">পরে আবার চেষ্টা করুন।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="block cursor-pointer"
            >
              <article className="rounded-xl border border-[#e0e9e1] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#eaf2eb] text-3xl">
                    {product.image || categoryIcon}
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {product.nameBn}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                    </p>
                  </div>
                </div>

                <div className="flex items-end justify-between border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-sm text-gray-500">আজকের দাম</p>

                    <p className="mt-1 text-2xl font-bold text-green-700">
                      ৳{product.today}
                      <span className="ml-1 text-sm font-normal text-gray-500">
                        / {product.unit === "kg" ? "কেজি" : product.unit}
                      </span>
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      product.change.dir === "up"
                        ? "bg-red-50 text-red-600"
                        : product.change.dir === "down"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {product.change.dir === "up"
                      ? "↑"
                      : product.change.dir === "down"
                        ? "↓"
                        : "—"}{" "}
                    {Math.abs(product.change.pct)}%
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
