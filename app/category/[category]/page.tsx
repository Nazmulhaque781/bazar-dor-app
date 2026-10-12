import { getProducts } from "@/lib/api";
import { notFound } from "next/navigation";
import CategoryProductList from "@/components/CategoryProductList";

export const instant = false;

const categories: Record<string, { name: string; icon: string }> = {
  chal: { name: "চাল", icon: "🍚" },
  dal: { name: "ডাল", icon: "🫘" },
  tel: { name: "তেল", icon: "🛢️" },
  sobji: { name: "সবজি", icon: "🥬" },
  mach: { name: "মাছ", icon: "🐟" },
  mangsho: { name: "মাংস", icon: "🍗" },
  "dim-dui": { name: "ডিম-দুধ", icon: "🥛" },
  mosla: { name: "মসলা", icon: "🌶️" },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const selectedCategory = categories[category];

  if (!selectedCategory) {
    notFound();
  }

  // শুধু selected category-এর products
  const products = await getProducts(category);

  return (
    <main className="min-h-screen bg-[#f7faf7] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <CategoryProductList
          products={products}
          categoryIcon={selectedCategory.icon}
          categoryName={selectedCategory.name}
        />
      </div>
    </main>
  );
}
