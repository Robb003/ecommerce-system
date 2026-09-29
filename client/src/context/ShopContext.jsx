import { createContext } from "react"
import { products } from "../assets/assets";
import { useState } from "react";
//connecting with the api's used to fetch  data can be callled to various pages

export const ShopContext = createContext();
export const Currency = "Ksh";

const ShopContextProvider = (props)=>{
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const value ={
        products,
        Currency,
        search, setSearch, showSearch, setShowSearch

    }
    
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

};
export default ShopContextProvider