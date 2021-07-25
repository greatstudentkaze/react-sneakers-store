import { useEffect } from 'react';
import { Route } from 'react-router-dom';

import { AppContextProvider } from '../../context/app.context';
import { API } from '../../utils/api';
import useDataAPI from '../../hooks/useDataAPI';
import useCartPanel from '../../hooks/useCartPanel';
import { SneakersItem } from '../../interfaces/sneakers.interface';

import Header from '../header';
import CartPanel from '../cart-panel';
import Home from '../../screens/home';
import Wishlist from '../../screens/wishlist';

type Data = SneakersItem[];

const App = () => {
  const [isCartPanelOpened, openCartPanel, closeCartPanel] = useCartPanel(false);
  const [{ data, isLoading, isError }, doFetch] = useDataAPI<Data>(API.SNEAKERS, []);

  useEffect(() => {
    doFetch(API.SNEAKERS);
  }, [doFetch]);

  return (
    <AppContextProvider sneakers={data} areSneakersLoading={isLoading} isSneakersLoadingError={isError} >
      <div className="main-wrapper">
        <Header openCartPanel={openCartPanel} />
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/wishlist" exact>
          <Wishlist />
        </Route>
      </div>
      {isCartPanelOpened && <CartPanel close={closeCartPanel} />}
    </AppContextProvider>
  );
};

export default App;
