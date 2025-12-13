import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { Input, QRCode, Space } from 'antd';
import { useState } from "react";
import { useProducts } from "../contexts/ProductsContext";
import { useCart } from "../contexts/CartContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { products, loading, error, fetchProducts } = useProducts();
  const { addToCart } = useCart();
  const [text, setText] = useState('https://ant.design/');

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <Space vertical align="center">
        <QRCode value={text || "-"} />
        <Input
          placeholder="-"
          maxLength={60}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Space>
      {error && (
        <div className="mb-8 p-6 bg-red-100 border-2 border-red-300 rounded-lg">
          <p className="text-red-800 font-bold mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onViewDetails={(product) => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;
