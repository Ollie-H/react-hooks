import { useState, useEffect } from "react";
import axios from "axios";
import { formatOrganisationUrl } from "../../Utils";

export interface UseReadApiDataProps<T = any> {
  url?: string;
  initialData: Partial<T>;
  mapDataToModel?: (serverData: any) => T;
}

interface UseReadApiDataState<T = any> {
  data: T;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  performGet: () => void;
  performSetUrl: (url: string) => void;
}

function useReadApiData<T = any>(
  props: UseReadApiDataProps<T>
): UseReadApiDataState<T> {
  const [data, setData] = useState(props.initialData as T);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [url, setUrl] = useState(props.url);

  const fetchData = async () => {
    if (!props.url) {
      return;
    }
    setIsError(false);
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const formattedUrl = formatOrganisationUrl(props.url);
      const result = await axios.get(formattedUrl);
      setIsError(false);
      if (props.mapDataToModel) {
        setData(props.mapDataToModel(result.data));
      } else {
        setData(result.data);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  const performGet = () => {
    fetchData();
  };

  const performSetUrl = (url: string) => {
    setUrl(url);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    errorMessage,
    data,
    isLoading,
    isError,
    performGet,
    performSetUrl
  };
}

export default useReadApiData;
