import { createContext, useReducer } from "react";

export const cartContext = createContext()

export const cartReducer = (state, action) => {
    switch (action.type){
        case "UPDATE_CART":
            return {...state, cart: action.payload}
        default:
            return state
    }
}

export const CartContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, { 
        cart: []
    })

    return (
        <cartContext.Provider value={{...state, dispatch}}>
            { children }
        </cartContext.Provider>
    )

}