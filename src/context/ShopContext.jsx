import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import Cookies from 'js-cookie';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));

    const value = {
        products, currency, delivery_fee,
        search,setSearch,showSearch,setShowSearch, isLoggedIn, setIsLoggedIn
    }

    useEffect(() => {
        const token = Cookies.get('token');
        setIsLoggedIn(!!token);
      }, []);

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;