import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/cart/get`, {}, { withCredentials: true });
      
      if (Array.isArray(res.data.cart)) {
        setCartItems(res.data.cart);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Cart fetch error:", err);
  
      // Check if error is 401 (Unauthorized)
      if (err.response && err.response.status === 401) {
        navigate('/login'); // Redirect to login if unauthorized
      } else {
        setError("Failed to fetch cart items.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchCartItems();
  }, []);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (loading) return <div className="p-6 text-center">Loading cart...</div>;

  if (error) return <div className="p-6 text-red-600 text-center">{error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {Array.isArray(cartItems) && cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.itemId} className="flex items-center gap-4 border-b pb-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <p className="font-bold">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right text-xl font-bold">
            Total: ${getTotalPrice()}
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
