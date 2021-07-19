import React, { useEffect, useState } from 'react';

import Header from '../header';
import Catalog from '../catalog';
import CartPanel from '../cart-panel';

const App = () => {
  const [isCartPanelOpened, setIsCatPanelOpened] = useState(true);

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
          <Catalog title="Все кроссовки" />
        </main>
      </div>
      {isCartPanelOpened && <CartPanel close={() => setIsCatPanelOpened(false)} />}
    </>
  );
};

export default App;
