import Link from "next/link";
import { ArrowLeft } from "lucide-react";

async function getProduct(id) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/products/${id}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.product;
}

export default async function ProductDetails({ params }) {
  const { id } = await params;
  // console.log(params);
  const product = await getProduct(id);

  if (!product)
    return <div className="text-center mt-20">Product not found!</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <Link href="/" className="btn btn-ghost mb-5 gap-2">
        <ArrowLeft size={20} /> Back to Home
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-base-100 shadow-xl rounded-2xl p-6 border border-base-200">
        {/* Large Image [cite: 35] */}
        <figure className="flex justify-center items-center bg-base-200 rounded-xl p-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[400px] object-contain rounded-lg shadow-sm"
          />
        </figure>

        <div className="space-y-4">
          {/* Title & Price */}
          <h1 className="text-4xl font-bold">{product.title}</h1>{" "}
          {/* [cite: 36] */}
          <p className="text-2xl text-primary font-bold">${product.price}</p>
          {/* Meta Info [cite: 38] */}
          <div className="flex gap-4 text-sm opacity-70">
            <span className="badge badge-outline">
              {product.category || "General"}
            </span>
            <span>
              Added: {new Date(product.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="divider"></div>
          {/* Full Description [cite: 37] */}
          <h3 className="text-lg font-semibold">Description:</h3>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <div className="card-actions justify-end mt-10">
            <button className="btn btn-primary btn-wide">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
