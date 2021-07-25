import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import { AppContextProvider } from '../../context/app.context';
import { API } from '../../utils/api';
import useDataAPI from '../../hooks/useDataAPI';
import { SneakersItem } from '../../interfaces/sneakers.interface';

import Header from '../header';
import CartPanel from '../cart-panel';
import Home from '../../screens/home';
import Wishlist from '../../screens/wishlist';

type Data = SneakersItem[];

const App = () => {
  const [isCartPanelOpened, setIsCatPanelOpened] = useState(false);

  const [{ data: sneakers, isLoading, isError }, doFetch] = useDataAPI<Data>(API.SNEAKERS, []);

  useEffect(() => {
    doFetch(API.SNEAKERS);
  }, [doFetch]);

  useEffect(() => {
    isCartPanelOpened
      ? document.body.classList.add('no-scroll')
      : document.body.classList.remove('no-scroll');
  }, [isCartPanelOpened]);

  return (
    <AppContextProvider sneakers={sneakers} areSneakersLoading={isLoading} >
      <div className="main-wrapper">
        <Header openCartPanel={() => setIsCatPanelOpened(true)} />
        <Route path="/" exact>
          <Home isError={isError} />
        </Route>
        <Route path="/wishlist" exact>
          <Wishlist />
        </Route>
      </div>
      {isCartPanelOpened && <CartPanel close={() => setIsCatPanelOpened(false)} />}
    </AppContextProvider>
  );
};

export default App;
