import { SneakersItem } from '../interfaces/sneakers.interface';

const LOCAL_STORAGE_KEY = 'REACT_SNEAKERS_STORE';

export const getCartItemsFromLocalStorage = () => {
  const initialValue = [] as SneakersItem[];

  try {
    const item = localStorage.getItem(LOCAL_STORAGE_KEY);
    return item ? JSON.parse(item) : initialValue;
  } catch (err) {
    console.error(err);
    return initialValue;
  }
};

export const saveCartItemsToLocalStorage = (cartItems: SneakersItem[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
};
