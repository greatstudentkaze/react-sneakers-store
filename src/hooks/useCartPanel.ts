import { useState } from 'react';

const useCartPanel = (initialCartPanelState: boolean) => {
  const [isCartPanelOpened, setIsCatPanelOpened] = useState(initialCartPanelState);

  const openCartPanel = () => {
    setIsCatPanelOpened(true);
  };

  const closeCartPanel = () => {
    setIsCatPanelOpened(false);
  };

  return [isCartPanelOpened, openCartPanel, closeCartPanel] as const;
};

export default useCartPanel;
