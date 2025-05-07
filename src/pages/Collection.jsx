import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify'
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const currency = '$'

const Collection = () => {
  const { search, showSearch } = useContext(ShopContext)
  const [products, setProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const [category, setCategory] = useState([]);



  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/product/list')
      if (response.data.success) {
        setProducts(response.data.products);
        console.log(products);

      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  useEffect(() => {
    console.log(category);

  }, [category])

  const filteredProducts = products.filter(product => {
    const matchesCategory =
      category.length === 0 || category.includes(product.category);

    const matchesSearch =
      search.trim() === '' ||
      product.name.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className='flex flex-col lg:flex-row gap-6 pt-10 border-t'>
      {/* Sidebar - Filter options */}
      <div className='lg:w-1/4 px-4 min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} lg:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Clothing and Apparel'} onChange={toggleCategory} />Clothing and Apparel
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Electronics'} onChange={toggleCategory} />Electronics
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Home and Living'} onChange={toggleCategory} />Home and Living
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Beauty and Personal Care'} onChange={toggleCategory} />Beauty and Personal Care
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Toys and Games'} onChange={toggleCategory} />Toys and Games
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Groceries and Food'} onChange={toggleCategory} />Groceries and Food
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Product Collection */}
      <div className='flex-grow p-4'>
        <h2 className='text-xl font-bold mb-4'>Product Collection</h2>

        {/* map products */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
          {filteredProducts.map((product, index) => (
            <div
            key={index}
            onClick={() => navigate(`/product/${product._id}`)}
            className='border-gray-500 p-4 hover:shadow-md border transition duration-300 cursor-pointer'
          >
            <img
              src={product.image[0]}
              alt={product.name}
              className='w-full h-40 object-cover mb-2'
            />
            <h3 className='text-lg font-semibold'>{product.name}</h3>
            <p className='text-sm text-gray-600 mt-1'>{currency}{product.price}</p>
          </div>
          
          ))}

        </div>
      </div>
    </div>

  )
}

export default Collection