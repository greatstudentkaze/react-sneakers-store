import React from 'react';

import Catalog from '../../components/catalog';

interface HomeProps {
  isError: boolean,
}

const Home = ({ isError }: HomeProps) => {
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
