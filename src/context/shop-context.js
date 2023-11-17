import useLocalStorage from '@/hooks/useLocalStorage';
import React, { createContext, useEffect, useState } from 'react'
export const ShopContext = createContext(null);



function ShopContextProvider({ children }) {
    const [search, setSearch] = useState("")
    const [cart, setCart] = useLocalStorage("Cart", [])
    // let count = 0
    const [cartItems, setCartItems] = useState({});

    // const getDefaultCart = () => {
    //     // if (!listBeatContext) {
    //     //     return;
    //     // }
    //     let cart = {};
    //     // // for(let i = 1; i < listBeat.length + 1; i++){
    //     // //     cart[i] = 0;
    //     // // }
    //     // for (let i = 1; i < listBeatContext.length + 1; i++) {
    //     //     listBeatContext.forEach(beat => {
    //     //         // cart[beat.id] = 0
    //     //     })
    //     // };
    //     return cart;
    // };

    // if(JSON.parse(localStorage.getItem("Cart")) !== null &&  ){

    // }

    // localStorage.setItem("CheckOutPage", JSON.stringify("false"))
    // localStorage.setItem("Cart", JSON.stringify(cartItems))

    // if (localStorage.getItem("CheckOutPage") !== null) {
    //     // console.log(JSON.parse(localStorage.getItem("Cart")))
    //     // console.log(JSON.parse(localStorage.getItem("CheckOutPage")))
    //     // console.log(cartItems)
    //     if (JSON.parse(localStorage.getItem("CheckOutPage")).includes("true")) {
    //         console.log(JSON.parse(localStorage.getItem("Cart")))
    //         setCartItems(JSON.parse(localStorage.getItem("Cart")))
    //         localStorage.setItem("CheckOutPage", JSON.stringify("false"))
    //     }
    // }
    // useEffect(() => {
    //     if (JSON.parse(localStorage.getItem("CheckOutPage")).includes("false")) {
    //         // console.log(JSON.parse(localStorage.getItem("Cart")))
    //         // console.log(cartItems)
    //         localStorage.setItem("Cart", JSON.stringify(cartItems))

    //     }
    //     console.log(cartItems)
    //     count = 0
    //     for (const item in cartItems) {
    //         if (cartItems[item] > 0) {
    //             count = count + 1
    //         }
    //     }
    //     setCountCart(count)
    // }, [cartItems])


    const addToCart = (itemId) => {
        // Check if itemId is already in the cart
        if (!cart.includes(itemId)) {
            // If not in cart, add it
            setCart([...cart, itemId]);
            console.log("Item added to cart:", itemId);
        } else {
            // If already in cart, you might want to handle this case
            console.log("Item is already in the cart:", itemId);
        }
    };
    
    const removeFromCart = (itemId) => {

        setCart(cart.filter(x => {
            return x !== itemId
        }))
    }
    const clearCart = () => {
        setCart([])
    }
    console.log(cart)
    const contextValue = {
        // cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cart,
        search,
        setSearch,
    };
    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider