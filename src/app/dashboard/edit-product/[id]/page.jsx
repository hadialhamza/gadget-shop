"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  Save,
  Loader2,
  ArrowLeft,
  Tag,
  DollarSign,
  Image as ImageIcon,
  FileText,
  LayoutGrid,
  PenSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function EditProductPage({ params }) {
  const { id } = React.use(params);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setFormData(data.product);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not load product details.",
          confirmButtonColor: "#EF4444",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product updated successfully.",
          showConfirmButton: false,
          timer: 1500,
          iconColor: "#10B981",
        });

        setTimeout(() => {
          router.push("/dashboard/manage-products");
          router.refresh();
        }, 1500);
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating.",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="hover:bg-secondary/50 gap-2 pl-0 hover:pl-2 transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <CardHeader className="text-center border-b border-border/50 pb-8">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <PenSquare className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Edit Product
              </CardTitle>
              <CardDescription>
                Update the details of your gadget below
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-8">
              <form onSubmit={handleUpdate} className="space-y-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Product Title
                  </Label>
                  <div className="relative group">
                    <div
                      className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                        isFocused.title
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Tag className="h-4 w-4" />
                    </div>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      onFocus={() =>
                        setIsFocused((p) => ({ ...p, title: true }))
                      }
                      onBlur={() =>
                        setIsFocused((p) => ({ ...p, title: false }))
                      }
                      className="pl-10 h-12 bg-background/50 border-input focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="e.g. Sony Headphones"
                      required
                    />
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <div className="relative group">
                      <div
                        className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                          isFocused.price
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        <DollarSign className="h-4 w-4" />
                      </div>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        onFocus={() =>
                          setIsFocused((p) => ({ ...p, price: true }))
                        }
                        onBlur={() =>
                          setIsFocused((p) => ({ ...p, price: false }))
                        }
                        className="pl-10 h-12 bg-background/50"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <div className="relative group">
                      <div
                        className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                          isFocused.category
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </div>
                      <Input
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        onFocus={() =>
                          setIsFocused((p) => ({ ...p, category: true }))
                        }
                        onBlur={() =>
                          setIsFocused((p) => ({ ...p, category: false }))
                        }
                        className="pl-10 h-12 bg-background/50"
                        placeholder="e.g. Audio"
                        required
                      />
                    </div>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <div className="relative group">
                    <div
                      className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                        isFocused.image
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </div>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      onFocus={() =>
                        setIsFocused((p) => ({ ...p, image: true }))
                      }
                      onBlur={() =>
                        setIsFocused((p) => ({ ...p, image: false }))
                      }
                      className="pl-10 h-12 bg-background/50"
                      placeholder="https://..."
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <div className="relative group">
                    <div
                      className={`absolute left-3 top-4 transition-colors ${
                        isFocused.description
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                    </div>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      onFocus={() =>
                        setIsFocused((p) => ({ ...p, description: true }))
                      }
                      onBlur={() =>
                        setIsFocused((p) => ({ ...p, description: false }))
                      }
                      className="pl-10 min-h-[120px] bg-background/50 leading-relaxed resize-y"
                      placeholder="Product details..."
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="pt-4"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium btn-primary-custom shadow-lg shadow-primary/25"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Updating Product...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Save className="h-5 w-5" />
                        Save Changes
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
