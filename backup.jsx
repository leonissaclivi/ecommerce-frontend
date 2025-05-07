import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/cart/get`, {}, { withCredentials: true });
      setCartItems(Array.isArray(res.data.cart) ? res.data.cart : []);
    } catch (err) {
      if (err.response?.status === 401) navigate('/login');
      else setError("Failed to fetch cart items.");
    } finally {
      setLoading(false);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleOrder = async () => {
    const requiredFields = Object.values(address).every(field => field.trim() !== '');
    if (!requiredFields) {
      return alert("Please fill out all address fields.");
    }

    const orderData = {
      items: cartItems,
      address,
      paymentMethod,
      amount: getTotalPrice(),
    };

    try {
      const res = await axios.post(`${backendUrl}/api/order/place`, orderData, { withCredentials: true });

      if (res.data.success) {
        alert("Order placed successfully!");
        navigate('/orders');
      } else {
        alert(res.data.message || "Order failed.");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Failed to place order.");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading checkout...</div>;
  if (error) return <div className="p-6 text-red-600 text-center">{error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item.itemId} className="flex items-center gap-4 border-b pb-4">
                <img src={`${backendUrl}/images/${item.image}`} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <p className="font-bold">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Address Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="First Name" className="border p-2 rounded" value={address.firstName} onChange={(e) => setAddress({ ...address, firstName: e.target.value })} />
            <input type="text" placeholder="Last Name" className="border p-2 rounded" value={address.lastName} onChange={(e) => setAddress({ ...address, lastName: e.target.value })} />
            <input type="text" placeholder="Street Address" className="border p-2 rounded col-span-1 md:col-span-2" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
            <input type="text" placeholder="City" className="border p-2 rounded" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
            <input type="text" placeholder="State" className="border p-2 rounded" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
            <input type="text" placeholder="Zip Code" className="border p-2 rounded" value={address.zipcode} onChange={(e) => setAddress({ ...address, zipcode: e.target.value })} />
            <input type="text" placeholder="Phone Number" className="border p-2 rounded col-span-1 md:col-span-2" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
          </div>

          {/* Payment */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Payment Method</label>
            <select
              className="w-full border rounded p-2"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <div className="text-right text-xl font-bold mb-4">
            Total: ${getTotalPrice()}
          </div>

          <button
            onClick={handleOrder}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
