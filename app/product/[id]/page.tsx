import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";

export const instant = false;

type Props = {
  params: Promise<{ id: string }>;
};

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

const getProductDescription = (
  productName: string,
  category: string,
  unit: string,
) => {
  const banglaUnit = getUnit(unit);

  return `প্রতি ${banglaUnit} ${category}`;
};

const getPriceChangeText = (dir: string, percentage: number) => {
  const percent = toBanglaNumber(percentage);

  if (dir === "up") {
    return `গতকালের তুলনায় আজ দাম বেড়েছে ${percent}%`;
  }

  if (dir === "down") {
    return `গতকালের তুলনায় আজ দাম কমেছে ${percent}%`;
  }

  return "গতকালের তুলনায় আজ দাম অপরিবর্তিত";
};

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;

  // Login check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackUrl=/product/${id}`);
  }

  // API থেকে product data
  let product;

  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  // Market data থেকে average calculate
  const marketData = product.markets.map((market) => ({
    market: market.market,
    division: market.division,
    min: market.min,
    max: market.max,
    avg: (market.min + market.max) / 2,
  }));

  // Overall minimum
  const minPrice =
    marketData.length > 0
      ? Math.min(...marketData.map((item) => item.min))
      : product.today;

  // Overall maximum
  const maxPrice =
    marketData.length > 0
      ? Math.max(...marketData.map((item) => item.max))
      : product.today;

  // Overall average
  const avgPrice =
    marketData.length > 0
      ? marketData.reduce((sum, item) => sum + item.avg, 0) / marketData.length
      : product.today;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const productDescription = getProductDescription(
    product.nameBn,
    product.categoryNameBn,
    product.unit,
  );

  const priceChangeText = getPriceChangeText(
    product.change.dir,
    product.change.pct,
  );

  return (
    <main className="min-h-screen bg-[#f1f6f2] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span>হোম</span>
          <span>›</span>
          <span>{product.categoryNameBn}</span>
          <span>›</span>
          <strong className="text-[#202b24]">{product.nameBn}</strong>
        </div>

        {/* Product Header */}
        <section className="mb-6 rounded-2xl border border-[#dce6de] bg-[#f7faf7] p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Product Information */}
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#eaf2eb] text-5xl">
                {product.image || product.categoryIcon}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#202b24] sm:text-3xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-sm font-medium text-[#4c7458]">
                  {productDescription}
                </p>

                <p className="mt-2 text-sm text-gray-500">{priceChangeText}</p>
              </div>
            </div>

            {/* Current Price */}
            <div className="min-w-[220px] rounded-2xl border border-[#dce6de] bg-white p-5 text-center">
              <span className="text-sm text-gray-500">আজকের বাজার দর</span>

              <div className="mt-1 flex items-baseline justify-center gap-2">
                <strong className="text-4xl font-bold text-[#2f6b3c]">
                  {toBanglaNumber(product.today)}
                </strong>

                <span className="text-sm text-gray-500">
                  টাকা / {getUnit(product.unit)}
                </span>
              </div>

              <div
                className={`mt-2 text-sm font-semibold ${
                  isUp
                    ? "text-red-500"
                    : isDown
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {isUp && "▲"}
                {isDown && "▼"} {toBanglaNumber(product.change.pct)}%
              </div>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="rounded-2xl border border-[#dce6de] bg-[#f7faf7] p-5 shadow-sm sm:p-7">
          <h2 className="mb-5 text-xl font-bold text-[#202b24]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Minimum */}
            <article className="rounded-xl border border-[#dce6de] bg-white p-5">
              <span className="text-sm text-gray-500">সর্বনিম্ন দর</span>

              <strong className="mt-2 block text-2xl font-bold text-[#2f6b3c]">
                ৳ {toBanglaNumber(minPrice)}
                <small className="ml-1 text-sm font-normal text-gray-500">
                  টাকা
                </small>
              </strong>

              <p className="mt-2 text-xs text-gray-400">
                সকল বাজারের মধ্যে সর্বনিম্ন
              </p>
            </article>

            {/* Maximum */}
            <article className="rounded-xl border border-[#dce6de] bg-white p-5">
              <span className="text-sm text-gray-500">সর্বোচ্চ দর</span>

              <strong className="mt-2 block text-2xl font-bold text-red-500">
                ৳ {toBanglaNumber(maxPrice)}
                <small className="ml-1 text-sm font-normal text-gray-500">
                  টাকা
                </small>
              </strong>

              <p className="mt-2 text-xs text-gray-400">
                সকল বাজারের মধ্যে সর্বোচ্চ
              </p>
            </article>

            {/* Average */}
            <article className="rounded-xl border border-[#dce6de] bg-white p-5">
              <span className="text-sm text-gray-500">গড় মূল্য</span>

              <strong className="mt-2 block text-2xl font-bold text-[#2f6b3c]">
                ৳ {toBanglaNumber(avgPrice)}
                <small className="ml-1 text-sm font-normal text-gray-500">
                  টাকা
                </small>
              </strong>

              <p className="mt-2 text-xs text-gray-400">
                সকল বাজারের গড় মূল্য
              </p>
            </article>
          </div>

          {/* Market heading */}
          <div className="mb-4 mt-8">
            <h2 className="text-xl font-bold text-[#202b24]">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {toBanglaNumber(marketData.length)}টি বাজারের বর্তমান মূল্য
            </p>
          </div>

          {/* Market Table */}
          <div className="overflow-x-auto rounded-xl border border-[#dce6de]">
            <table className="w-full min-w-[700px] border-collapse text-sm">
              <thead>
                <tr className="bg-[#eaf2eb] text-left text-[#31533a]">
                  <th className="px-5 py-4 font-semibold">বাজার</th>

                  <th className="px-5 py-4 font-semibold">বিভাগ</th>

                  <th className="px-5 py-4 font-semibold">সর্বনিম্ন</th>

                  <th className="px-5 py-4 font-semibold">সর্বোচ্চ</th>

                  <th className="px-5 py-4 font-semibold">গড়</th>
                </tr>
              </thead>

              <tbody>
                {marketData.map((item, index) => (
                  <tr
                    key={`${item.market}-${index}`}
                    className="border-t border-[#e5ece6] bg-white transition hover:bg-[#f7faf7]"
                  >
                    <td className="px-5 py-4 font-medium text-[#202b24]">
                      {item.market}
                    </td>

                    <td className="px-5 py-4 text-gray-600">{item.division}</td>

                    <td className="px-5 py-4 text-gray-700">
                      {toBanglaNumber(item.min)} টাকা
                    </td>

                    <td className="px-5 py-4 text-gray-700">
                      {toBanglaNumber(item.max)} টাকা
                    </td>

                    <td className="px-5 py-4 font-semibold text-[#2f6b3c]">
                      {toBanglaNumber(item.avg)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
