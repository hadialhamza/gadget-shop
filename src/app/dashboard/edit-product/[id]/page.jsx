"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default  function  EditProductPage ({ params }) {
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

  // ১. আগের ডাটা লোড করা
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data.product);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ২. আপডেট হ্যান্ডলার
  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Product Updated!");
      router.push("/dashboard/manage-products"); // আপডেটের পর লিস্টে ফেরত
      router.refresh();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Product</h2>
      <form
        onSubmit={handleUpdate}
        className="card bg-base-100 shadow-xl p-8 space-y-4"
      >
        {/* Title */}
        <div className="form-control">
          <label className="label">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        {/* Price & Image */}
        <div className="flex gap-4">
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="input input-bordered w-1/2"
            placeholder="Price"
            required
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input input-bordered w-1/2"
            placeholder="Image URL"
            required
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered h-24"
          required
        ></textarea>

        <button type="submit" className="btn btn-warning w-full">
          Update Product
        </button>
      </form>
    </div>
  );
}
