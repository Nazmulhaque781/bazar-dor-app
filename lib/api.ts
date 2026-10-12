
import { Product } from "@/types/product";

const BASE_URL =
  "https://openapi.programming-hero.com/api/bazardor";

export const getProducts = async (
  category?: string,
): Promise<Product[]> => {
  const url = category
    ? `${BASE_URL}/products?category=${encodeURIComponent(category)}`
    : `${BASE_URL}/products`;

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

export const getProduct = async (
  id: string,
): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
};

