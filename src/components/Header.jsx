import { ShoppingCart, Store, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { getCartCount, setShowCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const cartCount = getCartCount();

  const handleLoginClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleClickPortfolio = () => {
    navigate("/portfolio");
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Ecommerce-Shop</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLoginClick}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
            >
              <LogIn className="w-5 h-5" />
              <span>
                {isAuthenticated ? user?.name || "Dashboard" : "Login"}
              </span>
            </button>
            <button
              onClick={() => setShowCart(true)}
              className="relative flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={handleClickPortfolio}
              className="relative flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-all"
            >
              Portfolio
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
