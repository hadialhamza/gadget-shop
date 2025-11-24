"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);

  // ডাটা লোড করা
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  // ডিলিট ফাংশন
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // UI থেকে রিমুভ করা
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-5">Manage Products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={product.image} alt="img" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.title}</div>
                    </div>
                  </div>
                </td>
                <td>${product.price}</td>
                <td className="flex gap-2">
                  <Link
                    href={`/products/${product._id}`}
                    className="btn btn-xs btn-info"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
