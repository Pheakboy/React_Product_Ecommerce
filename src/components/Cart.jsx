import { X, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const {
    cart,
    showCart,
    setShowCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (!showCart) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button
            onClick={() => setShowCart(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-400">Add some products to get started!</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 mb-4 p-4 bg-gray-50 rounded-lg"
                >
                  <img
                    src={item.images?.[0] || "https://via.placeholder.com/100"}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-blue-600 font-bold mb-2">
                      ${item.price}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <p className="font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold">Total:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Clear Cart
                </button>
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
