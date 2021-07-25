import { useEffect, useState } from 'react';

const useCartPanel = (initialCartPanelState: boolean) => {
  const [isCartPanelOpened, setIsCatPanelOpened] = useState(initialCartPanelState);

  useEffect(() => {
    isCartPanelOpened
      ? document.body.classList.add('no-scroll')
      : document.body.classList.remove('no-scroll');
  }, [isCartPanelOpened]);

  const openCartPanel = () => {
    setIsCatPanelOpened(true);
  };

  const closeCartPanel = () => {
    setIsCatPanelOpened(false);
  };

  return [isCartPanelOpened, openCartPanel, closeCartPanel] as const;
};

export default useCartPanel;
