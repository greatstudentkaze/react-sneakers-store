import React, { useEffect, useState } from 'react';

import { SneakersItem } from '../../interfaces/sneakers.interface';

import Header from '../header';
import Catalog from '../catalog';
import CartPanel from '../cart-panel';
import useDataAPI from '../../hooks/useDataAPI';

const API_URL = 'https://60151aae55dfbd00174c9fa6.mockapi.io/sneakers/';

type Data = SneakersItem[];

const App = () => {
  const [isCartPanelOpened, setIsCatPanelOpened] = useState(false);
  const [cartItems, setCartItems] = useState<SneakersItem[]>([]);

  const [{ data: sneakers, isLoading, isError }, doFetch] = useDataAPI<Data>(API_URL, []);

  const removeCartItem = (id: SneakersItem['id']) => {
    const updated = cartItems.filter(it => it.id !== id);
    setCartItems(updated);
  };

  const addCartItem = (item: SneakersItem) => {
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
