import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';

interface State {
  isLoading: boolean,
  isError: boolean,
  data: any,
}

export type DataFetchAction = { type: 'FETCH_INIT' } | { type: 'FETCH_SUCCESS', payload: State['data'] } | { type: 'FETCH_FAILURE' };

const dataFetchReducer = (state: State, action: DataFetchAction): State => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

const useDataAPI = <T>(initialURL: string, initialData: T) => {
  const [url, setURL] = useState(initialURL);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const { data } = await axios.get<typeof initialData>(url);

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILURE' });
      }
    };

    fetchData();
  }, [url]);

  return [state, setURL] as const;
};

export default useDataAPI;
