import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import useDataAPI from '../hooks/useDataAPI';
import { API } from '../utils/api';
import { getCartItemsFromLocalStorage, saveCartItemsToLocalStorage } from '../utils/cart';
import { SneakersItem } from '../interfaces/sneakers.interface';

export interface IAppContext {
  sneakers: SneakersItem[],
  areSneakersLoading: boolean,
}

export interface ICartContext {
  cartItems: SneakersItem[],
  addItemToCart: (item: SneakersItem) => void,
  removeItemFromCartById: (id: SneakersItem['id']) => void,
}

export interface IWishlistContext {
  wishlistItems: SneakersItem[],
  areWishlistItemsLoading: boolean,
  isWishlistError: boolean,
}

const defaultValue = {
  sneakers: [],
  areSneakersLoading: false,
  cartItems: [],
  removeItemFromCartById: () => {},
  addItemToCart: () => {},
  wishlistItems: [],
  areWishlistItemsLoading: false,
  isWishlistError: false,
};

export const AppContext = createContext<IAppContext & ICartContext & IWishlistContext>(defaultValue);

export const AppContextProvider = ({ sneakers, areSneakersLoading, children }: PropsWithChildren<IAppContext>): JSX.Element => {
  const [cartItems, setCartItems] = useState<SneakersItem[]>(getCartItemsFromLocalStorage);
  const [
    { isError: isWishlistError, isLoading: areWishlistItemsLoading, data: wishlistItems, },
    doWishlistFetch
  ] = useDataAPI<SneakersItem[]>(API.WISHLIST, []);

  const removeItemFromCartById = (id: SneakersItem['id']) => {
    const updated = cartItems.filter(it => it.id !== id);
    setCartItems(updated);
  };

  const addItemToCart = (item: SneakersItem) => {
    // quick fix
    if (cartItems.find(it => it.id === item.id)) {
      return;
    }

    setCartItems((prevItems) => [...prevItems, item]);
  };

  useEffect(() => {
    saveCartItemsToLocalStorage(cartItems);
  }, [cartItems]);

  useEffect(() => {
    doWishlistFetch(API.WISHLIST);
  }, [doWishlistFetch]);

  return (
    <AppContext.Provider value={{
      sneakers,
      cartItems,
      areSneakersLoading,
      removeItemFromCartById,
      addItemToCart,
      isWishlistError,
      areWishlistItemsLoading,
      wishlistItems,
    }}>
      {children}
    </AppContext.Provider>
  )
};
