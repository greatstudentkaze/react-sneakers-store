import { createContext, PropsWithChildren } from 'react';

import { SneakersItem } from '../interfaces/sneakers.interface';

export interface IAppContext {
  sneakers: SneakersItem[],
  areSneakersLoading: boolean,
  isSneakersLoadingError: boolean,
  isLoading: boolean,
  showLoader: () => void,
  hideLoader: () => void,
}

const defaultValue = {
  sneakers: [],
  areSneakersLoading: false,
  isSneakersLoadingError: false,
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
};

export const AppContext = createContext<IAppContext>(defaultValue);

type AppContextProviderProps = {
  sneakers: SneakersItem[],
  areSneakersLoading: boolean,
  isSneakersLoadingError: boolean,
  isLoading: boolean,
  showLoader: () => void,
  hideLoader: () => void,
}

export const AppContextProvider = (props: PropsWithChildren<AppContextProviderProps>): JSX.Element => {
  const {
    sneakers,
    isSneakersLoadingError,
    isLoading,
    areSneakersLoading,
    showLoader,
    hideLoader,
    children
  } = props;

  return (
    <AppContext.Provider value={{
      sneakers,
      areSneakersLoading,
      isSneakersLoadingError,
      isLoading,
      showLoader,
      hideLoader,
    }}>
      {children}
    </AppContext.Provider>
  )
};
