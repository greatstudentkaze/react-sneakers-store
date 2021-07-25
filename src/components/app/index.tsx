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
  const [{ data, isLoading, isError }, doFetch] = useDataAPI<Data>(API.SNEAKERS, []);

  useEffect(() => {
    doFetch(API.SNEAKERS);
  }, [doFetch]);

  const [isCartPanelOpened, setIsCatPanelOpened] = useState(false);

  useEffect(() => {
    isCartPanelOpened
      ? document.body.classList.add('no-scroll')
      : document.body.classList.remove('no-scroll');
  }, [isCartPanelOpened]);

  return (
    <AppContextProvider sneakers={data} areSneakersLoading={isLoading} isSneakersLoadingError={isError} >
      <div className="main-wrapper">
        <Header openCartPanel={() => setIsCatPanelOpened(true)} />
        <Route path="/" exact>
          <Home />
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
