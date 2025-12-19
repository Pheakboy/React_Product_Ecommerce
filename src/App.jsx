import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import { PortfolioProvider } from "./contexts/PortfolioContext";
import Header from "./components/Header";
import Cart from "./components/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";

// Layout component for routes that need Header and Cart
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {children}
      <Cart />
    </div>
  );
};

const PortfolioLayout = ({ children }) => {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <PortfolioProvider>
              <Routes>
                {/* Public login route without header */}
                <Route path="/login" element={<LoginPage />} />

                {/* Public routes with header and cart */}
                <Route
                  path="/"
                  element={
                    <MainLayout>
                      <HomePage />
                    </MainLayout>
                  }
                />
                <Route
                  path="/portfolio"
                  element={
                    <PortfolioLayout>
                      <Portfolio />
                    </PortfolioLayout>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <MainLayout>
                      <ProductDetailPage />
                    </MainLayout>
                  }
                />

                {/* Protected dashboard route */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </PortfolioProvider>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
