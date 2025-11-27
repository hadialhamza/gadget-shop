import Link from "next/link";
import { ArrowLeft, ShoppingCart, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

const getBaseUrl = () => {
  if (process.env.NEXTAUTH_URL) {
    return `${process.env.NEXTAUTH_URL}`;
  }
  return "http://localhost:3000";
};

async function getProduct(id) {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.product;
  } catch (error) {
    return null;
  }
}

export default async function ProductDetails({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product)
    return (
      <div className="text-center mt-20 text-red-500">Product not found!</div>
    );

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <Button
        variant="ghost"
        asChild
        className="mb-6 pl-0 hover:pl-2 transition-all"
      >
        <Link href="/products" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column: Image */}
        <Card className="border-none shadow-none bg-secondary/20 flex items-center justify-center p-8 rounded-2xl h-[400px] md:h-[500px]">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full w-auto object-contain drop-shadow-xl mix-blend-multiply dark:mix-blend-normal"
          />
        </Card>

        {/* Right Column: Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <Badge variant="secondary" className="mb-4 text-sm px-3 py-1">
              {product.category || "Gadget"}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {product.title}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">
                ${product.price}
              </span>
              <span className="text-sm text-muted-foreground line-through opacity-70">
                ${(product.price * 1.2).toFixed(2)}
              </span>
            </div>
          </div>

          <Separator />

          <p className="text-muted-foreground leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-card">
              <Truck className="text-primary h-6 w-6" />
              <span className="text-sm font-medium">Free Delivery</span>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-card">
              <ShieldCheck className="text-primary h-6 w-6" />
              <span className="text-sm font-medium">1 Year Warranty</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-1/2 text-lg h-12">
              Buy Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-1/2 text-lg h-12 gap-2"
            >
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
