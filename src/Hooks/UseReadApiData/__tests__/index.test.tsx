import { act, testHook } from "react-testing-library";
import useReadApiData, { UseReadApiDataProps } from "../";
import axios from "axios";
import { flushPromises } from "../../../test.helpers";

jest.mock("axios");

const MOCK_URL = "url";
const MOCK_RESPONSE = { data: { a: 1 } };

const useReadApiDataProps: UseReadApiDataProps = {
  url: MOCK_URL,
  initialData: {},
  mapDataToModel: jest.fn(res => res)
};

describe("useCounter", () => {
  let data, isLoading, isError, errorMessage, performGet;

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue(MOCK_RESPONSE);
  });

  afterEach(() => {
    (axios.get as jest.Mock).mockReset();
  });

  it("Should handle valid data correctly", async () => {
    testHook(
      () =>
        ({ data, isLoading, isError, performGet } = useReadApiData(
          useReadApiDataProps
        ))
    );
    expect(axios.get).toBeCalledWith(MOCK_URL);
    expect(axios.get).toBeCalledTimes(1);
    expect(data).toEqual({});
    expect(isLoading).toEqual(true);
    expect(isError).toEqual(false);
    await flushPromises();
    expect(data).toEqual(MOCK_RESPONSE.data);
    expect(isLoading).toEqual(false);
    expect(isError).toEqual(false);
  });

  it("Should refetch data when called", async () => {
    testHook(
      () =>
        ({ data, isLoading, isError, performGet } = useReadApiData(
          useReadApiDataProps
        ))
    );
    expect(data).toEqual({});
    await flushPromises();
    act(performGet);
    await flushPromises();
    expect(axios.get).toBeCalledTimes(2);
    expect(isLoading).toEqual(false);
    expect(isError).toEqual(false);
  });

  it("Should handle error correctly when api throws", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("An error occurred"));
    testHook(
      () =>
        ({
          data,
          isLoading,
          isError,
          performGet,
          errorMessage
        } = useReadApiData(useReadApiDataProps))
    );
    await flushPromises();
    expect(isLoading).toEqual(false);
    expect(isError).toEqual(true);
    expect(errorMessage).toEqual("An error occurred");
  });
});
