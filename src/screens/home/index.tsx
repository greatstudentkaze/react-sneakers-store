import { useContext } from 'react';

import { AppContext } from '../../context/app.context';

import Catalog from '../../components/catalog';

const Home = () => {
  const { isSneakersLoadingError: isError } = useContext(AppContext);

  return (
    <main className="main">
      {isError
        ? 'Что-то пошло не так...'
        : <Catalog title="Все кроссовки" />
      }
    </main>
  );
};

export default Home;
