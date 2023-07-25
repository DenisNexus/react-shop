import React, { useContext } from "react";
import AppContext from '../contex';

// создали кастомный хук useCart котрый возвращает данные . 
export const useCart =  () => {
    const {setCartItems , cartItems} = useContext(AppContext)
    const totalPrise = cartItems.reduce((sum , obj) => sum+obj.price, 0)
    return {setCartItems , cartItems , totalPrise}
}

