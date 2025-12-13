import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import Header from "./components/Header";
import Cart from "./components/Cart";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <Router>
      <ProductsProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>
            <Cart />
          </div>
        </CartProvider>
      </ProductsProvider>
    </Router>
  );
}

export default App;
