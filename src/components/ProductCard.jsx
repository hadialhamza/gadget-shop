import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-base-200">
      <figure className="px-4 pt-4">
        <img
          src={product.image}
          alt={product.title}
          className="rounded-xl h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{product.title}</h2>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="flex flex-col items-center gap-2 mt-2">
          <span className="text-xl font-bold text-primary">
            ${product.price}
          </span>
          <div className="card-actions">
            <Link
              href={`/products/${product.id}`}
              className="btn btn-primary btn-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
