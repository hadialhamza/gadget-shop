"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { Search, Filter } from "lucide-react";

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
    <div className="min-h-screen bg-background py-12 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="title-primary">All Gadgets</h1>
          <p className="subtitle">
            Explore our exclusive collection. Use the search bar to find exactly
            what you need.
          </p>
        </div>

        {/* Toolbar Section (Search & Filter) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-base-200 p-4 rounded-xl shadow-sm">
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search by name..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // সার্চ লজিক
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="text-gray-500 w-5 h-5" />
            <select
              className="select select-bordered w-full md:w-48"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)} // ফিল্টার লজিক
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid Section */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-400">
              No products match your search!
            </h3>
            <button
              className="btn btn-link"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductView;
