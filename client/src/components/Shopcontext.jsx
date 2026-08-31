import { createContext } from "react-router-dom";


export const ShopContext = createContext();

const ShopContextProvider = (props)=>{
    const value ={

    }
    return (
        <ShopContextProvider value={value}>
            {props.children}
        </ShopContextProvider>
    )

};
export default ShopContext