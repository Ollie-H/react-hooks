import { act, testHook } from "react-testing-library";
import useWriteApiData, { UseWriteApiDataProps } from "../";
import axios from "axios";
import * as y from "yup";
import { ObjectSchema } from "yup";
import { flushPromises } from "../../../test.helpers";

jest.mock("axios");

const MOCK_URL = "url";
const MOCK_RESPONSE = { data: { a: 1 } };

interface Shema {
  test: string;
}

const contactSchema: ObjectSchema<Shema> = y.object({
  test: y.string().required()
});

const useWriteApiDataProps: UseWriteApiDataProps<Shema> = {
  url: MOCK_URL,
  mapDataToModel: jest.fn(res => res),
  httpAction: axios.post,
  validations: contactSchema
};

describe("useCounter", () => {
  let isLoading, isError, errors, setData, data;

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue(MOCK_RESPONSE);
    testHook(
      () =>
        ({ errors, isLoading, isError, setData, data } = useWriteApiData(
          useWriteApiDataProps
        ))
    );
  });

  afterEach(() => {
    (axios.get as jest.Mock).mockReset();
    (useWriteApiDataProps.httpAction as jest.Mock).mockReset();
  });

  it("Should handle validations correctly", async () => {
    await flushPromises();
    act(() => setData({}));
    await flushPromises();
    expect(errors[0].message).toBe("test is a required field");
    expect(errors.length).toBe(1);
    expect(useWriteApiDataProps.httpAction).not.toBeCalled();
    expect(errors.length).toBe(1);
    expect(isLoading).toBe(false);
    expect(isError).toBe(true);
  });

  it("Should handle valid data correctly", async () => {
    await flushPromises();
    act(() => setData({ test: "test" }));
    await flushPromises();
    expect(errors.length).toBe(0);
    expect(useWriteApiDataProps.httpAction).toBeCalledWith("url", {
      test: "test"
    });
    expect(isLoading).toBe(false);
    expect(isError).toBe(false);
  });
});
