import { useEffect, useState } from 'react';
import axios from 'axios';

const useDataAPI = <T>(initialURL: string, initialData: T) => {
  const [url, setURL] = useState(initialURL);
  const [data, setData] = useState(initialData);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const { data } = await axios.get<typeof initialData>(url);

        setData(data);
      } catch (err) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setURL] as const;
};

export default useDataAPI;
