import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import cn from 'classnames';

import { UserContextProvider } from '../../context/user.context';
import { AppContextProvider } from '../../context/app.context';
import { API } from '../../utils/api';
import { AppRoute } from '../../const';
import useDataAPI from '../../hooks/useDataAPI';
import useCartPanel from '../../hooks/useCartPanel';
import useLoader from '../../hooks/useLoader';
import { SneakersItem } from '../../interfaces/sneakers.interface';

import Header from '../header';
import CartPanel from '../cart-panel';
import Home from '../../screens/home';
import Wishlist from '../../screens/wishlist';
import Profile from '../../screens/profile';
import Loader from '../loader';
import { CartContextProvider } from '../../context/cart.context';
import { WishlistContextProvider } from '../../context/wishlist.context';

type Data = SneakersItem[];

const App = () => {
  const [isLoading, showLoader, hideLoader] = useLoader();
  const [isCartPanelOpened, openCartPanel, closeCartPanel] = useCartPanel(false);
  const [{ data, isLoading: areSneakersLoading, isError }, doFetch] = useDataAPI<Data>(API.SNEAKERS, []);

  useEffect(() => {
    doFetch(API.SNEAKERS);
  }, [doFetch]);

  return (
        <AppContextProvider sneakers={data} areSneakersLoading={areSneakersLoading} isSneakersLoadingError={isError} isLoading={isLoading} showLoader={showLoader} hideLoader={hideLoader}>
          <UserContextProvider>
            <WishlistContextProvider>
              <CartContextProvider>
                <div className="main-wrapper">
                  <Header openCartPanel={openCartPanel} />
                  <Route path={AppRoute.ROOT} exact>
                    <Home />
                  </Route>
                  <Route path={AppRoute.WISHLIST} exact>
                    <Wishlist />
                  </Route>
                  <Route path={AppRoute.PROFILE} exact>
                    <Profile />
                  </Route>
                </div>
                <CartPanel isOpened={isCartPanelOpened} close={closeCartPanel} />
              </CartContextProvider>
            </WishlistContextProvider>
          </UserContextProvider>
          <Loader className={cn({ 'active': isLoading })} />
        </AppContextProvider>
  );
};

export default App;
