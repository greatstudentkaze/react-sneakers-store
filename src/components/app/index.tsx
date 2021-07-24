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

  const [{ data: sneakers, isLoading, isError }, doFetch] = useDataAPI<Data>(API_URL, []);

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
        <Header />
        <main className="main">
          {isError && 'Что-то пошло не так...'}
          {isLoading ? (
            'Загрузка...'
          ) : (
            !isError && <Catalog title="Все кроссовки" items={sneakers} />
          )}
        </main>
      </div>
      {isCartPanelOpened && <CartPanel close={() => setIsCatPanelOpened(false)} />}
    </>
  );
};

export default App;
