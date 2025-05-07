import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';

const FeaturedProducts = () => {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.post(`${backendUrl}/api/product/list`);
        const allProducts = res.data.products || [];
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        setFeatured(shuffled.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800">Featured Products</h2>
        <p className="text-gray-600 mt-2">Check out some of our latest top picks</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {featured.map(product => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition"
          >
            <img src={product.image[0]} alt={product.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-1">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/collection"
          className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
