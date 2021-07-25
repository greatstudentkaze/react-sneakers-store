import { useState } from 'react';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);

  const hideLoader = () => setIsLoading(false);

  return [isLoading, showLoader, hideLoader] as const;
};

export default useLoader;
