import ProductCard from "@/components/ProductCard";
import React from "react";

const Products = async () => {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();

  const products = data?.products;
  console.log(products);

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
        // <h2 key={product._id}>{product.title}</h2>
      ))}
    </div>
  );
};

export default Products;
