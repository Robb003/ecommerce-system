import { createContext } from "react"
import { products } from "../assets/assets";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
//connecting with the api's used to fetch  data can be callled to various pages

export const ShopContext = createContext();
export const Currency = "Ksh";

const ShopContextProvider = (props)=>{
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
// adding an item to the cart
    const addToCart = async (itemId, sizes) => {
        if(!sizes){
            toast.error('Select Product Size');
            return;

        }
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][sizes]){
                cartData[itemId][sizes] += 1;
            }
            else {
                cartData[itemId][sizes] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][sizes] = 1;
        }
        setCartItems(cartData);
        
    }
    useEffect(()=>{
        console.log(cartItems);

    }, [cartItems]);
//see the amount of quantity available in the cart

    const getCartCount = ()=>{
        let totalCount = 0;
        for(const items in cartItems){
            for( const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item]
                    }
                    
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    } 
// remove an item in the cart page
    const updateQuantity = async (itemId,sizes,quantity) => {
        let  cartData =structuredClone(cartItems)
        cartData[itemId][sizes] = quantity;
        setCartItems(cartData);
        
    }
    const value ={
        products,
        Currency,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount,
        updateQuantity

    }
    
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

};
export default ShopContextProvider