import { ShoppingCart, Heart, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Extract category name if it's an object
  const categoryName =
    typeof product.category === "object"
      ? product.category?.name || "Product"
      : product.category || "Product";

  // Get image from API
  const imageUrl = product.images?.[0];

  return (
    <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div
        onClick={() => onViewDetails(product)}
        className="relative h-56 bg-gray-100 overflow-hidden cursor-pointer flex items-center justify-center"
      >
        {imageError ? (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gray-200">
            <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">No image available</p>
          </div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gray-200">
            <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">No image</p>
          </div>
        )}

        {/* Badge */}
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Sale
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 left-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-all shadow-md"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>

        {/* Quick View Overlay */}
        <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
          {categoryName}
        </p>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2 line-clamp-2 h-14 text-gray-900 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600">(4.5)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ${(product.price * 1.2).toFixed(2)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
            isAdded
              ? "bg-green-500 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          {isAdded ? "Added to Cart!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
