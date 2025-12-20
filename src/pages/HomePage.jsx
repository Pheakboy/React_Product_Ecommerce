import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, TrendingUp } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { useProducts } from "../contexts/ProductsContext";
import { useCart } from "../contexts/CartContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { products, loading, error, fetchProducts } = useProducts();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = new Set();
    products.forEach((p) => {
      const category =
        typeof p.category === "object" ? p.category?.name : p.category;
      if (category && typeof category === "string") {
        cats.add(category);
      }
    });
    return Array.from(cats).slice(0, 6); // Limit to 6 categories
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      let productCategory = product.category;
      if (typeof productCategory === "object") {
        productCategory = productCategory?.name || "";
      }

      const matchesCategory =
        selectedCategory === "all" || productCategory === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort products
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      {/* Hero Banner */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Discover Amazing Products
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Explore our curated collection of premium products at unbeatable
              prices.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
            />
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                CATEGORIES
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
                    selectedCategory === "all"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
                  }`}
                >
                  All Products
                </button>
                {categories.map((category, idx) => (
                  <button
                    key={`category-${idx}-${category}`}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all text-sm capitalize ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sort Options */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">
                {filteredProducts.length} products found
              </span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="text-red-800 font-semibold">
                  Something went wrong
                </p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
              <button
                onClick={fetchProducts}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <Loading />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4 flex justify-center">
              <TrendingUp className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={`${product.id}-${selectedCategory}-${searchTerm}-${index}`}
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
                  }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={addToCart}
                    onViewDetails={(product) =>
                      navigate(`/product/${product.id}`)
                    }
                  />
                </div>
              ))}
            </div>

            <style>{`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
          </>
        )}
      </div>
    </main>
  );
};

export default HomePage;
