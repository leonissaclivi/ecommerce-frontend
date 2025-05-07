import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/order/userorders`, { withCredentials: true });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading orders...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={order._id} className="border rounded-lg p-4 mb-6 shadow-sm">
            <h3 className="font-semibold mb-2">Order #{index + 1}</h3>

            {/* Items */}
            <div className="mb-4">
              {order.items.map(item => (
                <div key={item._id} className="flex gap-4 border-b py-2">
                  <img src={`${backendUrl}/images/${item.image[0]}`} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                  <div className="text-right font-semibold">
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="text-sm text-gray-700 mb-3">
              <p className="font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street},</p>
              <p>{order.address.city}, {order.address.state}, {order.address.zipcode}</p>
              <p>{order.address.phone}</p>
            </div>

            {/* Other Info */}
            <div className="flex flex-wrap justify-between text-sm mt-2">
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Payment:</strong> {order.paymentMethod} ({order.payment ? 'Paid' : 'Not Paid'})</p>
              <p><strong>Total:</strong> ${order.amount}</p>
            </div>
          </div>
        ))
      )}

      {/* Continue Shopping */}
      <div className="text-center mt-10">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Orders;
