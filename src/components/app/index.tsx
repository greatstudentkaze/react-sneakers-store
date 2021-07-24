import React, { useEffect, useState } from 'react';

import { SneakersItem } from '../../interfaces/sneakers.interface';

import Header from '../header';
import Catalog from '../catalog';
import CartPanel from '../cart-panel';
import useDataAPI from '../../hooks/useDataAPI';

const API_URL = 'https://60151aae55dfbd00174c9fa6.mockapi.io/sneakers/';

type Data = SneakersItem[];

const LOCAL_STORAGE_KEY = 'REACT_SNEAKERS_STORE';

const App = () => {
  const [isCartPanelOpened, setIsCatPanelOpened] = useState(false);
  const [cartItems, setCartItems] = useState<SneakersItem[]>(() => {
    const initialValue = [] as SneakersItem[];

    try {
      const item = localStorage.getItem(LOCAL_STORAGE_KEY);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  const [{ data: sneakers, isLoading, isError }, doFetch] = useDataAPI<Data>(API_URL, []);

  const removeCartItem = (id: SneakersItem['id']) => {
    const updated = cartItems.filter(it => it.id !== id);
    setCartItems(updated);
  };

  const addCartItem = (item: SneakersItem) => {
    // quick fix
    if (cartItems.find(it => it.id === item.id)) {
      return;
    }

    setCartItems((prevItems) => [...prevItems, item]);
  };

  useEffect(() => {
    doFetch(API_URL);
  }, [doFetch]);

  useEffect(() => {
    isCartPanelOpened
      ? document.body.classList.add('no-scroll')
      : document.body.classList.remove('no-scroll');
  }, [isCartPanelOpened]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      <div className="main-wrapper">
        <Header openCartPanel={() => setIsCatPanelOpened(true)} />
        <main className="main">
          {isError && 'Что-то пошло не так...'}
          {isLoading ? (
            'Загрузка...'
          ) : (
            !isError && <Catalog title="Все кроссовки" items={sneakers} addItemToCart={addCartItem} removeItemFromCart={removeCartItem} />
          )}
        </main>
      </div>
      {isCartPanelOpened && <CartPanel close={() => setIsCatPanelOpened(false)} items={cartItems} removeItem={removeCartItem} />}
    </>
  );
};

export default App;
