import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
    cart: CartItem[]; //we're gonna have an array of many CartItems and are naming it cart
    addToCart: (item: CartItem) => void; //an item that is the shape of CartItem (as defined in CartItem.ts) is passed in when adding to cart
    //the =>void means that nothing is returned
    removeFromCart: (projectId: number) => void;
    clearCart: () => void;
}

//tell react that we are using a context file
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {

        setCart((prevCart) => {
            //need this code in case a user wants to add more to a donation for a project they already have in their cart
            const existingItem = prevCart.find((c) => c.projectId === item.projectId);
            const updatedCart = prevCart.map((c) => 
                c.projectId === item.projectId 
                    ? {...c, donationAmount: c.donationAmount + item.donationAmount} 
                    : c
            );

            return existingItem ? updatedCart : [...prevCart, item];//this array will contain whatever is already in the cart plus the new item that is being passed in
        });
    };

    const removeFromCart = (projectId: number) => {
        setCart((prevCart) => prevCart.filter((c) => c.projectId !== projectId)); //filter out all projects that are not equal to the one we're looking at. Then set the cart equal to that
    };

    const clearCart = () => {
        setCart(() => []);
    };

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}
        >
            {children}
        </CartContext.Provider>
    );

};

//give the program a way to use this
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}