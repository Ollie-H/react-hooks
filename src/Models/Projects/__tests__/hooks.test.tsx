import { act, testHook } from "react-testing-library";
import * as hooks from "../hooks";
import axios from "axios";
import projectInputMock from "../__mocks__/project-input.mock";
import projectMock from "../__mocks__/project.mock";
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
      data: [projectInputMock]
    });
    testHook(() => ({ data } = hooks.useGetProjects()));
    await flushPromises();
    expect(axios.get).toBeCalledWith(
      "http://localhost:8000/api/organisations/1/projects"
    );
    expect(data).toEqual([projectInputMock]);
  });

  it("useGetProject", async () => {
    let data;
    (axios.get as jest.Mock).mockResolvedValue({
      data: projectInputMock
    });
    testHook(() => ({ data } = hooks.useGetProject(1)));
    await flushPromises();
    expect(axios.get).toBeCalledWith(
      "http://localhost:8000/api/organisations/1/projects/1"
    );
    expect(data).toEqual(projectInputMock);
  });

  it("useCreateProject", async () => {
    let setData, errors;
    testHook(() => ({ setData, errors } = hooks.useCreateProject()));
    await flushPromises();
    act(() => setData(projectInputMock));
    await flushPromises();
    expect(axios.post).toBeCalledWith(
      "http://localhost:8000/api/organisations/1/projects",
      projectInputMock,
      { headers: { "X-Requested-With": "XMLHttpRequest" } }
    );
  });

  it("useUpdateProject", async () => {
    let setData, errors;
    testHook(() => ({ setData, errors } = hooks.useUpdateProject(1)));
    await flushPromises();
    act(() => setData(projectInputMock));
    await flushPromises();
    expect(axios.patch).toBeCalledWith(
      "http://localhost:8000/api/organisations/1/projects/1",
      projectInputMock,
      { headers: { "X-Requested-With": "XMLHttpRequest" } }
    );
  });
});
