import { act, testHook } from "react-testing-library";
import * as hooks from "../hooks";
import axios from "axios";
import { getUserData } from "../../../Models/Users/utils";
import userMock from "../__mocks__/user.mock";
import userinputMock from "../__mocks__/userinput.mock";
import userOrgMock from "../__mocks__/user-organisation.mock";
import { flushPromises } from "../../../test.helpers";

jest.mock("../../../Models/Users/utils");
jest.mock("axios");

const MOCK_SINGLE_USER_RESPONSE = userMock;
const MOCK_MULTIPLE_USER_RESPONSE = [userMock, userMock];

describe("User hooks", () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: MOCK_SINGLE_USER_RESPONSE
    });
    (axios.patch as jest.Mock).mockResolvedValue({});
    (axios.post as jest.Mock).mockResolvedValue({});
    (getUserData as jest.Mock).mockReturnValue({
      organisation: {
        organisation: 1
      }
    });
  });

  afterEach(() => {
    (axios.get as jest.Mock).mockReset();
    (axios.patch as jest.Mock).mockReset();
    (axios.post as jest.Mock).mockReset();
    (getUserData as jest.Mock).mockReset();
  });

  it("useGetUsers", async () => {
    let data;
    (axios.get as jest.Mock).mockResolvedValue({
      data: MOCK_MULTIPLE_USER_RESPONSE
    });
    testHook(() => ({ data } = hooks.useGetUsers()));
    await flushPromises();
    expect(axios.get).toBeCalledWith("http://localhost:8000/api/users/");
    expect(data).toEqual(MOCK_MULTIPLE_USER_RESPONSE);
  });

  it("useGetUser", async () => {
    let data;
    testHook(() => ({ data } = hooks.useGetUser(1)));
    await flushPromises();
    expect(axios.get).toBeCalledWith("http://localhost:8000/api/users/1");
    expect(data).toEqual(MOCK_SINGLE_USER_RESPONSE);
  });

  it("useGetByUsername", async () => {
    let data;
    testHook(() => ({ data } = hooks.useGetByUsername("olliehusband")));
    await flushPromises();
    expect(axios.get).toBeCalledWith(
      "http://localhost:8000/api/users/username/olliehusband"
    );
    expect(data).toEqual(MOCK_SINGLE_USER_RESPONSE);
  });

  it("useTwoFactorAuthenticate", async () => {
    let data;
    testHook(() => ({ data } = hooks.useTwoFactorAuthenticate(1)));
    await flushPromises();
    expect(axios.get).toBeCalledWith("http://localhost:8000/api/users/1/2fa");
  });

  it("useResendEmail", async () => {
    let data;
    testHook(() => ({ data } = hooks.useResendEmail(1)));
    await flushPromises();
    expect(axios.get).toBeCalledWith(
      "http://localhost:8000/api/users/1/verify-email"
    );
  });

  it("useResetPasswordVerify", async () => {
    let data;
    testHook(() => ({ data } = hooks.useResetPasswordVerify("1", "ssss")));
    await flushPromises();
    expect(axios.get).toBeCalledWith(
      "http://localhost:8000/api/users/1/reset-password/ss"
    );
  });

  it("useTwoFactorVerify", async () => {
    let setData, errors;
    testHook(() => ({ setData, errors } = hooks.useTwoFactorVerify(1)));
    await flushPromises();
    act(() => setData({ s: 1, a: 3 }));
    await flushPromises();
    await flushPromises();
    expect(axios.post).toBeCalledWith(
      "http://localhost:8000/api/users/1/2fa",
      { a: 3, s: 1 },
      { headers: { "X-Requested-With": "XMLHttpRequest" } }
    );
  });

  it("useUpdateUser", async () => {
    let setData, errors;
    testHook(() => ({ setData, errors } = hooks.useUpdateUser(1)));
    await flushPromises();
    act(() => setData(userinputMock));
    await flushPromises();
    expect(axios.patch).toBeCalledWith(
      "http://localhost:8000/api/users/1",
      userinputMock,
      { headers: { "X-Requested-With": "XMLHttpRequest" } }
    );
  });

  xit("useGetOrganisationUserList", async () => {
    let data;
    (axios.get as jest.Mock).mockResolvedValue({
      data: [userOrgMock]
    });
    await flushPromises();
    testHook(() => ({ data } = hooks.useGetOrganisationUserList()));
    await flushPromises();
    expect(axios.get).toBeCalledWith(
      "http://localhost:8000/api/organisations/1/users"
    );
    await flushPromises();
    console.log(JSON.stringify(data));
    expect(axios.get).toBeCalledTimes(2);
  });
});
