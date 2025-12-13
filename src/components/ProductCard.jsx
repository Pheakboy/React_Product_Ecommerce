import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div
        onClick={() => onViewDetails(product)}
        className="cursor-pointer"
      >
        <div className="h-48 overflow-hidden bg-gray-100">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/300"}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 h-14">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-blue-600">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
