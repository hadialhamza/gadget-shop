"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, Package, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="title-custom mb-4">
                Manage <span>Products</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Manage your product inventory and listings
              </p>
            </div>
            <Button
              asChild
              className="bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/25"
            >
              <Link
                href="/dashboard/add-product"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add New Product
              </Link>
            </Button>
          </div>

          {/* Stats and Search */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <Card className="lg:col-span-3 border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search products by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-700/50"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-linear-to-r from-blue-500 to-cyan-500 text-white">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Products</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <Package className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Products Table */}
        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white">
              <Package className="h-5 w-5 text-blue-500" />
              Product Inventory
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/80 dark:bg-slate-700/80 hover:bg-slate-50/80">
                    <TableHead className="w-[100px] font-semibold text-slate-700 dark:text-slate-300">
                      Image
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                      Product Details
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                      Category
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                      Price
                    </TableHead>
                    <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow
                      key={product._id}
                      className="border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <TableCell>
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-800 dark:text-white line-clamp-2">
                            {product.title}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                            {product.description?.substring(0, 60)}...
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0"
                        >
                          {product.category || "Uncategorized"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-lg bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                          ${product.price}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="h-9 w-9 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-600 transition-all duration-200"
                          >
                            <Link href={`/products/${product._id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="h-9 w-9 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/20 hover:text-green-600 transition-all duration-200"
                          >
                            <Link
                              href={`/dashboard/edit-product/${product._id}`}
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product._id)}
                            className="h-9 w-9 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 transition-all duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-10 w-10 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
                    {searchTerm ? "No products found" : "No products yet"}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-500 mb-4">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : "Get started by adding your first product"}
                  </p>
                  {!searchTerm && (
                    <Button
                      asChild
                      className="bg-linear-to-r from-blue-600 to-cyan-500"
                    >
                      <Link href="/dashboard/add-product">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Product
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Active Listings
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">
                  {products.length}
                </p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Package className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Value
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">
                  $
                  {products
                    .reduce(
                      (sum, product) => sum + (parseFloat(product.price) || 0),
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <span className="text-lg">💰</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Categories
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">
                  {new Set(products.map((p) => p.category)).size}
                </p>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <span className="text-lg">🏷️</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
