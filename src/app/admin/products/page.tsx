import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Category, Product } from "@/lib/types";
import { ProductsManager } from "@/components/admin/products-manager";

export default async function ProductsPage() {
  const supabase = createSupabaseServerClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id,name,slug,description,sort_order,active")
    .order("sort_order", { ascending: true });

  const { data: products } = await supabase
    .from("products")
    .select(
      "id,name,slug,description,category_id,price_per_kg_cents,cost_per_kg_cents,margin_pct,stock_grams,reorder_point_grams,image_url,active,categories(name)"
    )
    .order("name", { ascending: true });

  type ProductRow = Product & {
    categories?: { name: string } | { name: string }[] | null;
  };

  const mappedProducts: Product[] = ((products ?? []) as ProductRow[]).map(
    (product) => ({
      ...product,
      category_name: Array.isArray(product.categories)
        ? product.categories[0]?.name ?? null
        : product.categories?.name ?? null,
    })
  );

  return (
    <ProductsManager
      categories={(categories as Category[]) ?? []}
      products={mappedProducts}
    />
  );
}
