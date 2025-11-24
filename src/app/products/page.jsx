import ProductView from "@/components/ProductView";

const ProductsPage = async () => {
  let products = [];

  try {
    // সার্ভার সাইড ডাটা ফেচিং
    // নোট: ডেভেলপমেন্টে http://localhost:3000 ঠিক আছে, কিন্তু ডিপ্লয়ের সময় ডোমেইন লিংক লাগবে।
    // আপাতত রিলেটিভ পাথ ব্যবহার না করে সরাসরি ইউআরএল বা ডাটাবেস কল করা ভালো।
    const res = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/products`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await res.json();
    products = data?.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  // ক্লায়েন্ট কম্পোনেন্টকে ডাটা পাস করা হচ্ছে
  return <ProductView products={products} />;
};

export default ProductsPage;
