"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Heart,
  Star,
  Eye,
  Zap,
  Shield,
  Truck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const ProductCard = ({ product, variant = "default", className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Calculate discount percentage
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // Generate random rating between 4.0 and 5.0
  const rating = product.rating || (4 + Math.random()).toFixed(1);
  const reviewCount =
    product.reviewCount || Math.floor(Math.random() * 500) + 50;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  if (variant === "minimal") {
    return <MinimalProductCard product={product} />;
  }

  if (variant === "featured") {
    return <FeaturedProductCard product={product} />;
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-700 ${className}`}
    >
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {discount > 0 && (
            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg">
              -{discount}%
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
              New
            </Badge>
          )}
          {product.isFeatured && (
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
              Featured
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div
          className={`absolute top-4 right-4 z-10 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? "translate-x-0" : "translate-x-12"
          }`}
        >
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={`h-4 w-4 transition-all duration-200 ${
                isLiked ? "fill-red-500 text-red-500" : "text-slate-600"
              }`}
            />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
          >
            <Eye className="h-4 w-4 text-slate-600" />
          </Button>
        </div>

        {/* Product Image */}
        <div className="relative h-full w-full">
          <Image
            src={product.image || "/api/placeholder/400/400"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay on Hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          />

          {/* Quick Add to Cart */}
          <div
            className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <Button className="bg-white text-slate-900 hover:bg-slate-100 border-none shadow-lg rounded-full px-6 py-3 font-semibold">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Category */}
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="outline"
            className="text-xs font-medium text-slate-500"
          >
            {product.category || "Electronics"}
          </Badge>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-xs font-semibold">{rating}</span>
            <span className="text-xs text-slate-400">({reviewCount})</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-slate-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
          {product.description ||
            "Premium quality product with advanced features and modern design."}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Zap className="h-3 w-3 text-amber-500" />
            <span>Fast</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Shield className="h-3 w-3 text-green-500" />
            <span>1Y Warranty</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Truck className="h-3 w-3 text-blue-500" />
            <span>Free Delivery</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <Link href={`/products/${product._id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full group/btn hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50"
            >
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
};

// Minimal Variant for compact layouts
const MinimalProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700"
    >
      <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.originalPrice && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white border-0">
            -
            {Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100
            )}
            %
          </Badge>
        )}
      </div>

      <h3 className="font-semibold text-slate-800 dark:text-white mb-2 line-clamp-1">
        {product.name}
      </h3>

      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-slate-900 dark:text-white">
          ${product.price}
        </span>
        <Button size="sm" className="rounded-full">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

// Featured Variant for highlighted products
const FeaturedProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl overflow-hidden shadow-2xl"
    >
      <div className="relative h-80 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <Badge className="mb-3 bg-white/20 backdrop-blur-sm text-white border-0">
            Featured
          </Badge>

          <h3 className="text-xl font-bold mb-2">{product.name}</h3>
          <p className="text-blue-100 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-blue-200 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <Button className="bg-white text-blue-600 hover:bg-blue-50 rounded-full">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
