import { ShoppingCart, Store, LogIn, Menu, X, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { getCartCount, setShowCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const cartCount = getCartCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setMobileMenuOpen(false);
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleClickPortfolio = () => {
    setMobileMenuOpen(false);
    navigate("/portfolio");
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 group"
          >
            <div className="p-2 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl group-hover:shadow-lg transition-all">
              <Store className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
              ShopHub
            </h1>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors hover:bg-gray-50 rounded-lg"
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button
              onClick={handleClickPortfolio}
              className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors hover:bg-gray-50 rounded-lg"
            >
              Portfolio
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 md:px-4 md:py-2 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 group-hover:text-indigo-600 transition-colors" />
                <span className="hidden md:inline text-sm font-semibold group-hover:text-indigo-600">
                  Cart
                </span>
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 md:top-0 md:right-3 bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login Button */}
            <button
              onClick={handleLoginClick}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              <LogIn className="w-4 h-4" />
              {isAuthenticated ? user?.name || "Dashboard" : "Login"}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2 animate-in fade-in">
            <button
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button
              onClick={handleClickPortfolio}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium rounded-lg transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => {
                setShowCart(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium rounded-lg transition-colors relative"
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
              {cartCount > 0 && (
                <span className="ml-auto bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={handleLoginClick}
              className="w-full flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg transition-all mt-2"
            >
              <LogIn className="w-4 h-4" />
              {isAuthenticated ? user?.name || "Dashboard" : "Login"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
