import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import axios from 'axios';

import { AppContext } from './app.context';
import { API } from '../utils/api';
import useDataAPI from '../hooks/useDataAPI';
import { SneakersItem } from '../interfaces/sneakers.interface';

export interface IWishlistContext {
  wishlistItems: SneakersItem[],
  areWishlistItemsLoading: boolean,
  isWishlistError: boolean,
  removeItemFromWishlistById: (id: SneakersItem['id']) => void,
  addItemToWishlist: (item: SneakersItem) => void,
  isItemWishlisted: (itemId: SneakersItem['id']) => boolean,
}

const defaultValue = {
  wishlistItems: [],
  areWishlistItemsLoading: false,
  isWishlistError: false,
  removeItemFromWishlistById: () => {},
  addItemToWishlist: () => {},
  isItemWishlisted: () => false,
};

interface WishlistContextProviderProps {}

export const WishlistContext = createContext<IWishlistContext>(defaultValue);

export const WishlistContextProvider = ({ children }: PropsWithChildren<WishlistContextProviderProps>): JSX.Element => {
  const { showLoader, hideLoader } = useContext(AppContext);

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
    <WishlistContext.Provider value={{
      isWishlistError,
      areWishlistItemsLoading,
      wishlistItems,
      removeItemFromWishlistById,
      addItemToWishlist,
      isItemWishlisted,
    }}>
      {children}
    </WishlistContext.Provider>
  )
};
