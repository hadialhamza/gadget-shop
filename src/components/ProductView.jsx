"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const ProductView = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category || "General")),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background py-12 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-blue-500/5 -skew-y-3 -z-10 origin-top-left" />
      <div className="absolute top-20 right-[-100px] w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto">
        <div className="text-center mb-14 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="title-custom">
              Explore Our <br className="md:hidden" />
              <span>Gadget Collection</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="subtitle max-w-2xl mx-auto"
          >
            Find the perfect tech companion for your lifestyle. Use the tools
            below to filter and search.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="sticky top-20 z-30 mb-12"
        >
          <div className="bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between max-w-4xl mx-auto">
            <div className="relative w-full md:w-2/3 group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <Search className="h-5 w-5" />
              </div>
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10 h-12 bg-secondary/50 border-transparent focus:border-primary/50 focus:bg-background transition-all rounded-xl text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="w-full md:w-auto flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-12 w-full md:w-48 justify-between rounded-xl border-border/50 bg-secondary/30 hover:bg-secondary/50 hover:text-primary"
                  >
                    <span className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span className="truncate">
                        {selectedCategory === "All"
                          ? "Filter by Category"
                          : selectedCategory}
                      </span>
                    </span>
                    <SlidersHorizontal className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 p-2" align="end">
                  <DropdownMenuLabel>Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    {categories.map((cat) => (
                      <DropdownMenuRadioItem
                        key={cat}
                        value={cat}
                        className="cursor-pointer rounded-lg"
                      >
                        {cat}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {selectedCategory !== "All" && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedCategory("All")}
                  className="h-12 w-12 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  title="Clear Filter"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Showing{"  "}
            <span className="font-bold text-foreground">
              {filteredProducts.length}
            </span>
            {"  "}
            results
          </div>
        </motion.div>

        <div className="min-h-[400px] my-10 lg:my-18">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            // Empty State
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center space-y-6"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">No products found</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  {`We could not find anything matching "${searchTerm}" in ${selectedCategory}. Try adjusting your filters.`}
                </p>
              </div>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                variant="outline"
                className="rounded-full px-8"
              >
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
