import { useState, useEffect } from "react";
import axios from "axios";
import { ValidationError, ObjectSchema } from "yup";
import { formatOrganisationUrl } from "../../Utils";

interface ValidationErrors<T extends object = object> {
  (key: keyof T): ValidationError;
}

export interface UseWriteApiDataProps<T extends object = object> {
  url?: string;
  validations?: ObjectSchema<T>;
  mapDataToModel?: (data: T) => any;
  httpAction: typeof axios.post | typeof axios.put | typeof axios.patch;
}

interface UseWriteApiDataState<T extends object = object> {
  isSuccessful: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  errors: ValidationErrors<T>[];
  data: Partial<T>;
  setData: (data: T) => void;
}

function useWriteApiData<T extends object = object>(
  props: UseWriteApiDataProps<T>
): UseWriteApiDataState<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [isError, setIsError] = useState(false);
  const [isSuccessful, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  const writeData = async () => {
    setSuccess(false);
    setIsError(false);
    setErrors([]);
    setIsLoading(true);
    setErrorMessage(undefined);

    let formattedData = data;

    try {
      formattedData = await props.validations.validate(formattedData, {
        abortEarly: false
      });
      try {
        const formattedUrl = formatOrganisationUrl(props.url);
        await props.httpAction(formattedUrl, formattedData, {
          headers: {
            "X-Requested-With": "XMLHttpRequest"
          }
        });
        setIsError(false);
        setSuccess(true);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setErrorMessage(error.message);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setErrors(error.inner);
    }
  };

  useEffect(() => {
    writeData();
  }, [data]);

  return {
    isSuccessful,
    data,
    errors,
    errorMessage,
    isLoading,
    isError,
    setData: (s: T) => {
      setData(s);
    }
  };
}

export default useWriteApiData;
