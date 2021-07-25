import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import useDataAPI from '../hooks/useDataAPI';
import { API } from '../utils/api';
import { getCartItemsFromLocalStorage, saveCartItemsToLocalStorage } from '../utils/cart';
import { SneakersItem } from '../interfaces/sneakers.interface';

export interface IAppContext {
  sneakers: SneakersItem[],
  areSneakersLoading: boolean,
  isSneakersLoadingError: boolean,
}

export interface ICartContext {
  cartItems: SneakersItem[],
  addItemToCart: (item: SneakersItem) => void,
  removeItemFromCartById: (id: SneakersItem['id']) => void,
  isItemAddedToCart: (itemId: SneakersItem['id']) => boolean,
}

export interface IWishlistContext {
  wishlistItems: SneakersItem[],
  areWishlistItemsLoading: boolean,
  isWishlistError: boolean,
  isItemWishlisted: (itemId: SneakersItem['id']) => boolean,
}

const defaultValue = {
  sneakers: [],
  areSneakersLoading: false,
  isSneakersLoadingError: false,
  cartItems: [],
  removeItemFromCartById: () => {},
  addItemToCart: () => {},
  isItemAddedToCart: () => false,
  wishlistItems: [],
  areWishlistItemsLoading: false,
  isWishlistError: false,
  isItemWishlisted: () => false,
};

export const AppContext = createContext<IAppContext & ICartContext & IWishlistContext>(defaultValue);

export const AppContextProvider = ({ sneakers, isSneakersLoadingError, areSneakersLoading, children }: PropsWithChildren<IAppContext>): JSX.Element => {
  const [cartItems, setCartItems] = useState<SneakersItem[]>(getCartItemsFromLocalStorage);
  const [
    { isError: isWishlistError, isLoading: areWishlistItemsLoading, data: wishlistItems },
    doWishlistFetch
  ] = useDataAPI<SneakersItem[]>(API.WISHLIST, []);

  const removeItemFromCartById = (id: SneakersItem['id']) => {
    const updated = cartItems.filter(it => it.id !== id);
    setCartItems(updated);
  };

  const addItemToCart = (item: SneakersItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const isItemAddedToCart = (itemId: SneakersItem['id']) => {
    return cartItems.some(it => it.id === itemId);
  };

  useEffect(() => {
    saveCartItemsToLocalStorage(cartItems);
  }, [cartItems]);

  useEffect(() => {
    doWishlistFetch(API.WISHLIST);
  }, [doWishlistFetch]);

  const isItemWishlisted = (itemId: SneakersItem['id']) => {
    return wishlistItems.some((it: SneakersItem) => it.id === itemId);
  };

  return (
    <AppContext.Provider value={{
      sneakers,
      areSneakersLoading,
      isSneakersLoadingError,
      cartItems,
      removeItemFromCartById,
      addItemToCart,
      isItemAddedToCart,
      isWishlistError,
      areWishlistItemsLoading,
      wishlistItems,
      isItemWishlisted,
    }}>
      {children}
    </AppContext.Provider>
  )
};
