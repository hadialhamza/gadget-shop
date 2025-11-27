import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ShoppingCart,
  Truck,
  ShieldCheck,
  Star,
  Heart,
  Share2,
  RefreshCw,
  Zap,
  HandCoins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

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
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold text-red-500">Product not found!</h2>
        <Button asChild variant="outline">
          <Link href="/products">Browse Store</Link>
        </Button>
      </div>
    );

  const originalPrice = (product.price * 1.2).toFixed(2);
  const savings = (originalPrice - product.price).toFixed(2);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-muted/30 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            asChild
            className="pl-0 hover:pl-2 transition-all hover:bg-transparent text-muted-foreground hover:text-foreground"
          >
            <Link href="/products" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Products
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Card className="relative border-border/50 shadow-sm bg-secondary/10 dark:bg-secondary/5 overflow-hidden rounded-3xl h-[400px] md:h-[550px] flex items-center justify-center group">
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm font-medium shadow-lg">
                  Sale -20%
                </Badge>
              </div>

              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full shadow-md bg-background/80 backdrop-blur-sm hover:bg-background text-foreground transition-all hover:scale-110 hover:text-red-500"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full shadow-md bg-background/80 backdrop-blur-sm hover:bg-background text-foreground transition-all hover:scale-110 hover:text-blue-500"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="relative w-full h-full p-8 md:p-12 transition-transform duration-500 ease-in-out group-hover:scale-105">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-2xl"
                  priority
                />
              </div>
            </Card>

            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`relative aspect-square rounded-xl border cursor-pointer overflow-hidden bg-secondary/10 ${
                    i === 0
                      ? "ring-2 ring-primary border-primary"
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <Image
                    src={product.image}
                    alt="Thumbnail"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-primary border-primary/20 bg-primary/5"
                >
                  {product.category || "Gadget"}
                </Badge>
                <div className="flex items-center text-yellow-500 text-sm font-medium">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-foreground">4.8</span>
                  <span className="text-muted-foreground ml-1">
                    (124 reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                {product.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-baseline gap-4">
                <span className="text-4xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  ${product.price}
                </span>
                <span className="text-xl text-muted-foreground line-through decoration-red-500/50">
                  ${originalPrice}
                </span>
                <span className="text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-md">
                  Save ${savings}
                </span>
              </div>
            </div>

            <Separator className="bg-border/60" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold font-heading">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                {product.description}
                <br />
                <br />
                Engineered for performance and designed for style, this product
                brings the future of technology to your fingertips. Experience
                seamless integration and premium build quality.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-secondary/5">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Free Delivery</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-secondary/5">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">1 Year Warranty</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Full coverage included
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-secondary/5">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">30 Days Return</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    No questions asked
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-secondary/5">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Fast Dispatch</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="w-full sm:w-1/2 h-14 text-base btn-primary-custom shadow-blue-500/25 shadow-lg"
              >
                <span className="flex items-center gap-2">
                  {" "}
                  <HandCoins className="h-5 w-5" /> Buy Now
                </span>
              </Button>
              <Button
                size="lg"
                className="w-full sm:w-1/2 h-14 text-base btn-outline-custom gap-2 border-2 hover:bg-secondary/50"
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" /> Add to Cart
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
