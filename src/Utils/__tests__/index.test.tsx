import {
  toFormData,
  formatOrganisationUrl,
  getAuthBearer,
  addOrganisationToPayload
} from "../";
import { getUserData } from "../../Models/Users/utils";
jest.mock("../../Models/Users/utils");

describe("toFormData", () => {
  it("Should convert data structure to formData correctly", () => {
    const converted = toFormData({ a: "s" });
    const test = new FormData();
    test.append("a", "s");
    expect(converted).toEqual(test);
  });
});

describe("formatOrganisationUrl", () => {
  beforeAll(() => {
    (getUserData as jest.Mock).mockReturnValue({
      organisation: 1
    });
  });

  afterAll(() => {
    (getUserData as jest.Mock).mockReset();
  });

  it("Should interpoloate organisationId when :organisation is included in url", () => {
    const converted = formatOrganisationUrl("test/:organisation/test");
    expect(converted).toBe("test/1/test");
  });

  it("Should interpoloate nothing when :organisation is not included in url", () => {
    const converted = formatOrganisationUrl("/1");
    expect(converted).toBe("/1");
  });
});

describe("getAuthBearer", () => {
  beforeAll(() => {
    (getUserData as jest.Mock).mockReturnValue({
      authentication: {
        access_token: "sss"
      }
    });
  });

  afterAll(() => {
    (getUserData as jest.Mock).mockReset();
  });

  it("Should return authenticated headers", () => {
    const headers = getAuthBearer();
    expect(headers).toEqual({
      Authorization: "sss"
    });
  });
});

describe("addOrganisationToPayload", () => {
  beforeAll(() => {
    (getUserData as jest.Mock).mockReturnValue({
      organisation: 1
    });
  });

  it("Should add org id", () => {
    expect(addOrganisationToPayload({ s: 1 })).toEqual({
      s: 1,
      organisation: 1
    });
  });
});
