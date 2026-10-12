import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import DailyBazaar from "@/components/DailyBazaar";

export default async function Home() {
  const products = await getProducts();
  console.log("HOME PRODUCTS:", products);

  const risingProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f1f6f2]">
      {/* Hero Section */}
      <DailyBazaar />

      {/* Rising Products */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            আজ দাম বেড়েছে <span className="text-red-500">▲</span>
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            যেসব পণ্যের দাম আজ বৃদ্ধি পেয়েছে
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {risingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Falling Products */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            আজ দাম কমেছে <span className="text-green-600">▼</span>
          </h2>

          <p className="mt-1 text-sm text-gray-500">যেসব পণ্যের দাম আজ কমেছে</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fallingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* All Products */}
      <section id="সব-পণ্য" className="mx-auto max-w-6xl px-4 py-8 pb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>

          <p className="mt-1 text-sm text-gray-500">
            আজকের প্রয়োজনীয় সব পণ্যের বাজারদর
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
