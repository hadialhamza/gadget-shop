"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const AddProductPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // সেশন চেক: লগইন না থাকলে লগইন পেজে পাঠাবে
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // ফর্ম হ্যান্ডলার
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const price = form.price.value;
    const description = form.description.value;
    const image = form.image.value;
    const category = form.category.value;

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, price, description, image, category }),
      });

      if (res.ok) {
        alert("Product added successfully!"); // [Requirements: Show toast/message]
        form.reset();
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading")
    return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Product</h2>
      <form
        onSubmit={handleAddProduct}
        className="card bg-base-100 shadow-xl p-8 space-y-4"
      >
        {/* Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Type here"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Price & Category */}
        <div className="flex gap-4">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Price ($)</span>
            </label>
            <input
              type="number"
              name="price"
              placeholder="99.99"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <input
              type="text"
              name="category"
              placeholder="Headphones"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="url"
            name="image"
            placeholder="https://image.com/pic.jpg"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            className="textarea textarea-bordered h-24"
            placeholder="Product details..."
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
