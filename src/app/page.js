import Link from "next/link";
import { ShoppingBag, Truck, ShieldCheck, Headphones } from "lucide";
import ProductCard from "@/components/ProductCard";

// ডাটা ফেচিং ফাংশন (Server Side)
async function getProducts() {
  // ক্যাশ 'no-store' দেওয়া হয়েছে যাতে প্রতিবার নতুন ডাটা দেখায় (Real-time update)
  // নোট: প্রোডাকশনে 'http://localhost:3000' এর বদলে আপনার ডোমেইন নেম ব্যবহার করতে হবে
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
      cache: "no-store",
    });
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
  const featuredProducts = products.slice(0, 6); // প্রথম ৬টি প্রোডাক্ট [cite: 25
  return (
    <main>
      {/* Hero Section */}
      <div className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          <img
            src="https://images.unsplash.com/photo-1550009158-9ebf69056955?w=600&q=80"
            className="max-w-sm rounded-lg shadow-2xl"
            alt="Hero Gadget"
          />
          <div>
            <h1 className="text-5xl font-bold">Newest Gadgets Here!</h1>
            <p className="py-6">
              Find your favorite tech accessories at the best price.
            </p>
            <Link href="/products" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products Grid */}
      <section className="py-16 px-4 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Items</h2>

        {products.length === 0 ? (
          <p className="text-center">
            No products found. Add some from dashboard!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>


      {/* --- SECTION 3: FEATURES / WHY CHOOSE US --- */}
      <section className="py-16 bg-base-200 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Shop With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-md p-6 items-center text-center">
              {/* <ShoppingBag className="w-10 h-10 text-primary mb-4" /> */}
              <h3 className="font-bold text-lg">Authentic Products</h3>
              <p className="text-sm mt-2">
                100% original items directly from brands.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6 items-center text-center">
              {/* <Truck className="w-10 h-10 text-primary mb-4" /> */}
              <h3 className="font-bold text-lg">Fast Delivery</h3>
              <p className="text-sm mt-2">
                Delivery within 2-3 days nationwide.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6 items-center text-center">
              {/* <ShieldCheck className="w-10 h-10 text-primary mb-4" /> */}
              <h3 className="font-bold text-lg">Secure Payment</h3>
              <p className="text-sm mt-2">
                Your transactions are always safe with us.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6 items-center text-center">
              {/* <Headphones className="w-10 h-10 text-primary mb-4" /> */}
              <h3 className="font-bold text-lg">24/7 Support</h3>
              <p className="text-sm mt-2">We are here to help you anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: PROMO / BANNER --- */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-primary text-primary-content rounded-2xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative Circles (Design purpose) */}
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
      </section>
    </main>
  );
}
