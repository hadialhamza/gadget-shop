import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard"; // আপনার আগের কার্ড কম্পোনেন্ট

const FeaturedSection = ({ products }) => {
  return (
    <section className="py-24 px-4 md:px-8 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="container mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-2 text-center md:text-left w-full md:w-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Featured <span className="text-blue-600 dark:text-blue-400">Collections</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Handpicked premium gadgets just for you.
            </p>
          </div>
          
          <Link href="/products" className="hidden md:flex group items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
            View All Products <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {products?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed">
            <p className="text-muted-foreground">No products available at the moment.</p>
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Link href="/products">
            <button className="btn-outline-custom w-full">
              View All
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedSection;