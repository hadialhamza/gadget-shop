"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PackagePlus, UploadCloud } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const AddProductPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ১. সেশন চেক: লগইন না থাকলে লগইন পেজে রিডাইরেক্ট করবে
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // ২. প্রোডাক্ট অ্যাড করার হ্যান্ডলার ফাংশন
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    // ফর্ম থেকে ডাটা নেওয়া
    const productData = {
      title: form.title.value,
      price: form.price.value,
      description: form.description.value,
      image: form.image.value,
      category: form.category.value,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        alert("Product added successfully! 🎉");
        form.reset(); // ফর্ম ক্লিয়ার করা
        router.refresh(); // ডাটা রিফ্রেশ করা
      } else {
        alert("Failed to add product. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // লোডিং স্টেট হ্যান্ডেল করা (Auth চেক চলাকালীন)
  if (status === "loading") {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-muted-foreground animate-pulse">
          Checking authentication...
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-10 px-4">
      <Card className="shadow-lg border-muted">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-primary/10 rounded-full">
              <PackagePlus className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Add New Gadget</CardTitle>
          <CardDescription>
            Enter the details of the new product to add it to your inventory.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleAddProduct} className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Product Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Sony WH-1000XM5 Headphones"
                required
                className="focus-visible:ring-primary"
              />
            </div>

            {/* Price & Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="299.99"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="e.g. Audio, Gaming"
                  required
                />
              </div>
            </div>

            {/* Image URL Input */}
            <div className="space-y-2">
              <Label htmlFor="image">Product Image URL</Label>
              <div className="relative">
                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  required
                  className="pl-10"
                />
                <UploadCloud className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                Tip: You can host images on ImgBB and paste the link here.
              </p>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Write a detailed description about the product features..."
                className="min-h-[120px] resize-y focus-visible:ring-primary"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full text-lg h-11"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>{" "}
                  Adding...
                </span>
              ) : (
                "Add Product"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductPage;
