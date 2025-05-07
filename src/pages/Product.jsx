import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../App';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {toast} from 'react-toastify';

const Product = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/single`, { id });
      if (response.data.success) {
        setProduct(response.data.product);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/cart/add`, {
        itemId: product._id
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        toast.success('Product added to cart!'); 
        setMessage("Added to cart!");
      } else {
        setMessage(response.data.message || "Could not add to cart");
      }
    } catch (error) {
      console.error("Cart error:", error);
      setMessage("Error adding to cart");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-6 text-center text-lg">Loading...</div>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-8">
      {/* Left Column - Image Carousel */}
      <div className="flex-1 max-w-md mx-auto lg:mx-0">
        <Slider {...sliderSettings}>
          {product.image.slice(0, 4).map((imgUrl, index) => (
            <div key={index}>
              <img
                src={imgUrl}
                alt={`Product view ${index + 1}`}
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Right Column - Product Details */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-6">${product.price}</p>

        <button onClick={addToCart} className="px-6 py-2 bg-black text-white rounded hover:bg-gray-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
