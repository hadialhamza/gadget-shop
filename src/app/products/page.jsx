import React from "react";

const Products = async () => {
  const products = await fetch(
    "https://modelmatrixapi.vercel.app/models/recent"
  ).then((res) => res.json());

  console.log(products);

  return (
    <div>
      {products?.result?.map((product) => {
        return <h1 key={product.id}>{product?.name}</h1>;
      })}
    </div>
  );
};

export default Products;
