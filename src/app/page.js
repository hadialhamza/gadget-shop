import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag, Truck, ShieldCheck, Headphones } from "lucide";
import ProductCard from "@/components/ProductCard";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturesSection from "@/components/FeaturesSection";
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
      <HeroSection/>
      {/* <FeaturesSection/> */}
      {/* <PromoSection/> */}
      {/* <FeaturedProducts/> */}
      {/* --- Modern Hero Section --- */}
      {/* <section className="relative py-20 md:py-32 overflow-hidden bg-background">
        <div className="container px-2 sm:px-4 md:px-8 mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium text-primary">
              New Arrivals 2025
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Upgrade Your <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
                Digital Lifestyle
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Discover cutting-edge gadgets designed to elevate your
              productivity and entertainment. Experience technology like never
              before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                asChild
                className={"btn-primary-custom"}
              >
                <Link href="/products">
                  <span>Shop Now</span>
                </Link>
              </Button>
              <Button size="lg" variant="" asChild className={'btn-outline-custom'}>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative z-10 bg-linear-to-tr from-blue-100 to-cyan-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
              <img
                src="https://as2.ae/wp-content/uploads/2024/10/Gadgets-Examples.webp"
                alt="Hero Gadget"
                className="w-full h-auto rounded-xl"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 blur-[100px] -z-10 rounded-full"></div>
          </div>
        </div>
      </section> */}

      {/* Featured Section */}
      {/* <section className="py-20 px-4 md:px-8 bg-slate-50 dark:bg-slate-950/50">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Featured Collections
              </h2>
              <p className="text-muted-foreground mt-2">
                Handpicked gadgets just for you.
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link href="/products">View All &rarr;</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* --- SECTION 3: FEATURES / WHY CHOOSE US --- */}
      {/* <section className="py-16 bg-base-200 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Shop With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-md p-6 items-center text-center">
              <h3 className="font-bold text-lg">Authentic Products</h3>
              <p className="text-sm mt-2">
                100% original items directly from brands.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6 items-center text-center">
              <h3 className="font-bold text-lg">Fast Delivery</h3>
              <p className="text-sm mt-2">
                Delivery within 2-3 days nationwide.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6 items-center text-center">
              <h3 className="font-bold text-lg">Secure Payment</h3>
              <p className="text-sm mt-2">
                Your transactions are always safe with us.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6 items-center text-center">
              <h3 className="font-bold text-lg">24/7 Support</h3>
              <p className="text-sm mt-2">We are here to help you anytime.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* --- SECTION 4: PROMO / BANNER --- */}
      {/* <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-primary text-primary-content rounded-2xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-20 h-20 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Winter Sale is Live!
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Get up to 40% discount on all gaming accessories. Limited time
            offer.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/products"
              className="btn btn-wide bg-white text-primary hover:bg-gray-100 border-none"
            >
              Shop Sale
            </Link>
          </div>
        </div>
      </section> */}
    </main>
  );
}
