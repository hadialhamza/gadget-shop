import Link from "next/link";
import { ShoppingBag, Truck, ShieldCheck, Headphones } from "lucide";
import ProductCard from "@/components/ProductCard";

const featuredProducts = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 59.99,
    description: "Noise cancelling high quality sound.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  },
  {
    id: 2,
    title: "Smart Watch Pro",
    price: 129.0,
    description: "Track your fitness with style and precision.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
  },
  {
    id: 3,
    title: "Gaming Mouse",
    price: 45.5,
    description: "RGB lighting with ultra fast response time.",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
  },
];

export default function Home() {
  return (
    <main>
      {/* --- SECTION 1: HERO --- */}
      <div className="hero min-h-[80vh] bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          <img
            src="https://images.unsplash.com/photo-1550009158-9ebf69056955?w=600&q=80"
            className="max-w-sm md:max-w-md rounded-lg shadow-2xl"
            alt="Gadget Hero"
          />
          <div>
            <h1 className="text-5xl font-bold">Upgrade Your Tech Life!</h1>
            <p className="py-6 text-lg">
              Discover the latest gadgets that make your life smarter, easier,
              and more fun. Get the best deals on authentic tech products.
            </p>
            <Link href="/products" className="btn btn-primary btn-lg">
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: FEATURED PRODUCTS --- */}
      <section className="py-16 px-4 md:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Featured Gadgets</h2>
          <p className="text-gray-500">
            Check out our top-selling products this week
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="btn btn-outline btn-wide">
            View All Products
          </Link>
        </div>
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
