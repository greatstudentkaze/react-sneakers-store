import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import { getCartItemsFromLocalStorage, saveCartItemsToLocalStorage } from '../utils/cart';
import { SneakersItem } from '../interfaces/sneakers.interface';

export interface ICartContext {
  cartItems: SneakersItem[],
  addItemToCart: (item: SneakersItem) => void,
  removeItemFromCartById: (id: SneakersItem['id']) => void,
  isItemAddedToCart: (itemId: SneakersItem['id']) => boolean,
  clearCart: () => void,
  totalPrice: number,
}

const defaultValue = {
  cartItems: [],
  removeItemFromCartById: () => {},
  addItemToCart: () => {},
  isItemAddedToCart: () => false,
  clearCart: () => {},
  totalPrice: 0,
};

interface CartContextProviderProps {}

export const CartContext = createContext<ICartContext>(defaultValue);

export const CartContextProvider = ({ children }: PropsWithChildren<CartContextProviderProps>): JSX.Element => {
  const [cartItems, setCartItems] = useState<SneakersItem[]>(getCartItemsFromLocalStorage);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(cartItems.reduce((total, item) => total + item.price, 0))
    saveCartItemsToLocalStorage(cartItems);
  }, [cartItems]);

  const removeItemFromCartById = (id: SneakersItem['id']) => {
    const updated = cartItems.filter(it => it.id !== id);
    setCartItems(updated);
  };

  const clearCart = () => setCartItems([]);

  const addItemToCart = (item: SneakersItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const isItemAddedToCart = (itemId: SneakersItem['id']) => {
    return cartItems.some(it => it.id === itemId);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      clearCart,
      removeItemFromCartById,
      addItemToCart,
      isItemAddedToCart,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  )
};
