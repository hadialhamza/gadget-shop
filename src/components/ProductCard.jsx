import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProductCard = ({ product }) => {
  return (
    <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <CardHeader className="p-0 relative bg-gray-50 dark:bg-gray-900 h-64 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute top-3 right-3 bg-white text-black dark:bg-black dark:text-white">
          {product.category || "Gadget"}
        </Badge>
      </CardHeader>

      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {product.title}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
          {product.description}
        </p>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-xl font-bold">${product.price}</span>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button asChild className="w-full">
          <Link href={`/products/${product._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
