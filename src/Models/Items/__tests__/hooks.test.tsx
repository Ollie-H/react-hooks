import { act, testHook } from "react-testing-library";
import * as hooks from "../hooks";
import axios from "axios";
import projectItemInputMock from "../__mocks__/item-input.mock";
import projecItemtMock from "../__mocks__/item.mock";
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

  it("useGetProjects", async () => {
    let data;
    (axios.get as jest.Mock).mockResolvedValue({
      data: [projecItemtMock]
    });
    testHook(() => ({ data } = hooks.useGetProjectItems(1)));
    await flushPromises();
    expect(axios.get).toBeCalledWith(
      "http://localhost:8000/api/organisations/1/projects/1/items"
    );
    expect(data).toEqual([projecItemtMock]);
  });

  it("useCreateDepartment", async () => {
    let setData, errors;
    testHook(() => ({ setData, errors } = hooks.useCreateProjectItem(1)));
    await flushPromises();
    act(() => setData(projectItemInputMock));
    await flushPromises();
    expect(axios.post).toBeCalledWith(
      "http://localhost:8000/api/organisations/1/projects/1/items",
      {
        ...projectItemInputMock,
        active: true,
        project: 1,
        // TODO: mock not playing well
        organisation: undefined
      },
      { headers: { "X-Requested-With": "XMLHttpRequest" } }
    );
  });

  it("useUpdateDepartment", async () => {
    let setData, errors;
    testHook(() => ({ setData, errors } = hooks.useUpdateProjectItem(1, 2)));
    await flushPromises();
    act(() => setData(projectItemInputMock));
    await flushPromises();
    expect(axios.patch).toBeCalledWith(
      "http://localhost:8000/api/organisations/1/projects/1/items/2",
      {
        ...projectItemInputMock,
        active: true,
        project: 1,
        // TODO: mock not playing well
        organisation: undefined
      },
      { headers: { "X-Requested-With": "XMLHttpRequest" } }
    );
  });
});
