import React from 'react';

import Header from '../header';
import Catalog from '../catalog';

const App = () => {
  return (
    <div className="main-wrapper">
      <Header />
      <main className="main">
        <Catalog title="Все кроссовки" />
      </main>
    </div>
  );
};

export default App;
