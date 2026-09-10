import { createContext } from "react"
import { products } from "../assets/assets";
//connecting with the api's used to fetch  data can be callled to various pages

export const ShopContext = createContext();
export const Currency = "Ksh";

const ShopContextProvider = (props)=>{
    const value ={
        products,
        Currency

    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

};
export default ShopContextProvider