import { createContext, useReducer } from "react";

export const cartContext = createContext()

export const cartReducer = (state, action) => {
    switch (action.type){
        case "UPDATE_CART":
            return {...state, cart: action.payload}
        case "UPDATE_TOTAL":
            return {...state, total: action.payload}
        case "UPDATE_ITEMS":
                return {...state, itemCount: action.payload}
        default:
            return state
    }
}

export const CartContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, { 
        cart: [],
        total: 0.00,
        itemCount: 0
    })

    return (
        <cartContext.Provider value={{...state, dispatch}}>
            { children }
        </cartContext.Provider>
    )

}