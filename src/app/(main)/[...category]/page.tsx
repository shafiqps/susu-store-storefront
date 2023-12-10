import { getCategoryByHandle } from "@lib/data";
import CategoryTemplate from "@modules/categories/templates";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { category: string[] };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  try {
    const { product_categories } = await getCategoryByHandle(
      params.category
    );

    // Check if product_categories is undefined or empty
    if (!product_categories || product_categories.length === 0) {
      notFound();
    }

    const category = product_categories[0];

    // Check if category is undefined
    if (!category) {
      notFound();
    }

    return {
      title: `${category.name} | SUFFY Store`,
      description: `${category.name} category`,
    };
  } catch (err) {
    console.error("Error fetching category:", err);
    notFound();
  }
}

export default async function CategoryPage({ params }: Props) {
  try {
    const { product_categories } = await getCategoryByHandle(
      params.category
    );

    // Check if product_categories is undefined or empty
    if (!product_categories || product_categories.length === 0) {
      notFound();
    }

    return <CategoryTemplate categories={product_categories} />;
  } catch (err) {
    console.error("Error fetching category:", err);
    notFound();
  }
}
