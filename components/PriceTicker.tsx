import { Product } from "@/types/product";

interface PriceTickerProps {
  products: Product[];
}

const getUnit = (unit: string) => {
  switch (unit) {
    case "kg":
      return "কেজি";
    case "liter":
      return "লিটার";
    case "dozen":
      return "ডজন";
    case "piece":
      return "পিস";
    default:
      return unit;
  }
};

export default function PriceTicker({ products }: PriceTickerProps) {
  const tickerProducts = [...products, ...products];

  return (
    <div className="overflow-hidden border-y border-gray-200 bg-white">
      <div className="ticker-track flex w-max">
        {tickerProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex shrink-0 items-center gap-2 border-r border-gray-200 px-5 py-2 text-sm"
          >
            <span>{product.image}</span>

            <span className="font-medium text-gray-800">{product.nameBn}</span>

            <span className="text-gray-600">
              {product.today} টাকা/{getUnit(product.unit)}
            </span>

            <span
              className={
                product.change.dir === "up"
                  ? "font-semibold text-red-500"
                  : product.change.dir === "down"
                    ? "font-semibold text-green-600"
                    : "font-semibold text-gray-500"
              }
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {product.change.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
