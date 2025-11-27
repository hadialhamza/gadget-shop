import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseSection from "@/components/WhyChooseSection";
import PromoSection from "@/components/PromoSection";

async function getProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/products`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 6);
  return (
    <main>
      <HeroSection />
      <FeaturedProducts featuredProducts={featuredProducts} />
      <PromoSection />
      <WhyChooseSection />
    </main>
  );
}
