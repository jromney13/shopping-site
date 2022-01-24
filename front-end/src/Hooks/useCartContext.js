import { cartContext } from '../Context/CartContext';
import { useContext } from "react";

export const useCartContext = () => {
    const context = useContext(cartContext)

    if(!context) {
        throw Error("useCartContext must be inside an CartContextProvider")
    }

    return context
}