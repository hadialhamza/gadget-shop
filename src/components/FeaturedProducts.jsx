"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FeaturedProducts({ featuredProducts }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-10 px-4 md:px-8 bg-background mb-5">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Featured Collection</span>
          </div>

          <h2 className="title-custom my-6">
            Handpicked
            <span> For You</span>
          </h2>
          <p className="max-w-2xl mx-auto subtitle">
            Discover our carefully curated selection of premium gadgets that
            combine innovation, style, and performance.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12"
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} variant="featured" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg" className="btn-primary-custom group">
            <Link href="/products">
              <span className="flex items-center gap-2">
                View All Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 duration-300" />
              </span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
