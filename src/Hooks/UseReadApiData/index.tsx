import { useState, useEffect } from "react";
import axios from "axios";

export interface UseReadApiDataProps<T = any> {
  url: string;
  initialData: Partial<T>;
  mapDataToModel?: (serverData: any) => T;
}

interface UseReadApiDataState<T = any> {
  data: T;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  performGet: () => void;
}

function useReadApiData<T = any>(
  props: UseReadApiDataProps<T>
): UseReadApiDataState<T> {
  const [data, setData] = useState(props.initialData as T);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const result = await axios.get(props.url);
      setIsError(false);
      if (props.mapDataToModel) {
        setData(props.mapDataToModel(result.data));
      } else {
        setData(result.data);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  const performGet = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [props.url]);

  return {
    errorMessage,
    data,
    isLoading,
    isError,
    performGet
  };
}

export default useReadApiData;
