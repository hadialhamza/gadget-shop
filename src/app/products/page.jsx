import ProductView from "@/components/ProductView";

const ProductsPage = async () => {
  let products = [];

  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/products`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await res.json();
    products = data?.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return <ProductView products={products} />;
};

export default ProductsPage;
