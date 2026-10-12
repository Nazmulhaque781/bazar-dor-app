import Link from "next/link";
import { Product } from "@/types/product";
console.log("PRODUCT CARD FILE LOADED");

interface ProductCardProps {
  product: Product;
}

const getUnit = (unit: string) => {
  switch (unit) {
    case "kg":
      return "কেজি";
    case "liter":
    case "litre":
      return "লিটার";
    case "dozen":
      return "ডজন";
    case "piece":
      return "পিস";
    default:
      return unit;
  }
};

const toBanglaNumber = (value: number) => {
  return value.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
};

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.id}`}
      className="block w-full cursor-pointer"
    >
      <div className="w-full rounded-2xl bg-[#f0f5f0] p-5 text-[#202b24] transition hover:shadow-md">
        <div className="rounded-[22px] border border-[#dce6de] bg-[#fbfdfb] p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-3xl">
              {product.image}
            </div>

            <div className="min-w-0">
              <h3 className="text-xl font-bold">{product.nameBn}</h3>

              <p className="mt-1 text-sm text-[#566158]">
                প্রতি {getUnit(product.unit)}
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between gap-3">
            <div>
              <p className="mb-1 text-sm text-[#566158]">আজকের দাম</p>

              <p className="text-xl font-bold">
                ৳ {toBanglaNumber(product.today)}
                <span className="text-base font-normal"> টাকা</span>
              </p>
            </div>

            <div
              className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-sm font-bold ${
                isUp
                  ? "bg-[#fcebea] text-red-600"
                  : isDown
                    ? "bg-[#e4f3e8] text-green-700"
                    : "bg-[#f0f5f0] text-gray-600"
              }`}
            >
              <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>

              <span>{toBanglaNumber(Math.abs(product.change.pct))}%</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
