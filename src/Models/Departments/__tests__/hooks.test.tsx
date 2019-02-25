import { act, testHook } from "react-testing-library";
import * as hooks from "../hooks";
import axios from "axios";
import depInputMock from "../__mocks__/department-input.mock";
import depMock from "../__mocks__/department.mock";
import { getUserData } from "../../../Models/Users/utils";
import { flushPromises } from "../../../test.helpers";

jest.mock("../../../Models/Users/utils");
jest.mock("axios");

describe("User hooks", () => {
  beforeEach(() => {
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
  });

  it("useGetUsers", async () => {
    let data;
    (axios.get as jest.Mock).mockResolvedValue({
      data: [depMock]
    });
    testHook(() => ({ data } = hooks.useGetDepartments()));
    await flushPromises();
    expect(axios.get).toBeCalledWith(
      "http://localhost:8000/api/organisations/1/departments"
    );
    expect(data).toEqual([depMock]);
  });

  it("useCreateDepartment", async () => {
    let setData, errors;
    testHook(() => ({ setData, errors } = hooks.useCreateDepartment()));
    await flushPromises();
    act(() => setData(depInputMock));
    await flushPromises();
    expect(axios.post).toBeCalledWith(
      "http://localhost:8000/api/organisations/1/departments",
      depInputMock,
      { headers: { "X-Requested-With": "XMLHttpRequest" } }
    );
  });

  it("useUpdateDepartment", async () => {
    let setData, errors;
    testHook(() => ({ setData, errors } = hooks.useUpdateDepartment(1)));
    await flushPromises();
    act(() => setData(depInputMock));
    await flushPromises();
    expect(axios.patch).toBeCalledWith(
      "http://localhost:8000/api/organisations/1/departments/1",
      depInputMock,
      { headers: { "X-Requested-With": "XMLHttpRequest" } }
    );
  });
});
