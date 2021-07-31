import { createContext, PropsWithChildren, useEffect } from 'react';

import useDataAPI from '../hooks/useDataAPI';
import { API } from '../utils/api';
import { SneakersItem } from '../interfaces/sneakers.interface';
import axios from 'axios';

export interface IAppContext {
  sneakers: SneakersItem[],
  areSneakersLoading: boolean,
  isSneakersLoadingError: boolean,
  isLoading: boolean,
  showLoader: () => void,
  hideLoader: () => void,
}

export interface IWishlistContext {
  wishlistItems: SneakersItem[],
  areWishlistItemsLoading: boolean,
  isWishlistError: boolean,
  removeItemFromWishlistById: (id: SneakersItem['id']) => void,
  addItemToWishlist: (item: SneakersItem) => void,
  isItemWishlisted: (itemId: SneakersItem['id']) => boolean,
}

const defaultValue = {
  sneakers: [],
  areSneakersLoading: false,
  isSneakersLoadingError: false,
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
  wishlistItems: [],
  areWishlistItemsLoading: false,
  isWishlistError: false,
  removeItemFromWishlistById: () => {},
  addItemToWishlist: () => {},
  isItemWishlisted: () => false,
};

export const AppContext = createContext<IAppContext & IWishlistContext>(defaultValue);

type AppContextProviderProps = {
  sneakers: SneakersItem[],
  areSneakersLoading: boolean,
  isSneakersLoadingError: boolean,
  isLoading: boolean,
  showLoader: () => void,
  hideLoader: () => void,
}

export const AppContextProvider = (props: PropsWithChildren<AppContextProviderProps>): JSX.Element => {
  const { sneakers, isSneakersLoadingError, isLoading, areSneakersLoading, showLoader, hideLoader, children } = props;

  const [
    { isError: isWishlistError, isLoading: areWishlistItemsLoading, data: wishlistItems },
    doWishlistFetch,
    setWishlistItems
  ] = useDataAPI<SneakersItem[]>(API.WISHLIST, []);

  useEffect(() => {
    doWishlistFetch(API.WISHLIST);
  }, [doWishlistFetch]);

  const removeItemFromWishlistById = async (itemId: SneakersItem['id']) => {
    try {
      showLoader();
      const itemUid = wishlistItems.find((it: SneakersItem) => it.id === itemId).uid;
      await axios.delete(API.WISHLIST + itemUid);
      setWishlistItems(wishlistItems.filter((it: SneakersItem) => it.id !== itemId));
      hideLoader();
    } catch (err) {
      alert('Не удалось убрать товар из списка желаний');
      console.error(err);
    }
  };

  const addItemToWishlist = async (item: SneakersItem) => {
    try {
      showLoader();
      const { data } = await axios.post(API.WISHLIST, item);
      setWishlistItems([...wishlistItems, data]);
      hideLoader();
    } catch (err) {
      alert('Не удалось добавить товар в список желаний');
      console.error(err);
    }
  };

  const isItemWishlisted = (itemId: SneakersItem['id']) => {
    return wishlistItems.some((it: SneakersItem) => it.id === itemId);
  };

  return (
    <AppContext.Provider value={{
      sneakers,
      areSneakersLoading,
      isSneakersLoadingError,
      isLoading,
      showLoader,
      hideLoader,
      isWishlistError,
      areWishlistItemsLoading,
      wishlistItems,
      removeItemFromWishlistById,
      addItemToWishlist,
      isItemWishlisted,
    }}>
      {children}
    </AppContext.Provider>
  )
};
