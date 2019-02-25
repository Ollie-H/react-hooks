import * as mappings from "../mappings";
import userMock from "../__mocks__/user.mock";
import { UserInput } from "../types";

describe("mapUserWriteUpdate", () => {
  const userInput: UserInput = {
    ...userMock,
    profile_image: {
      lastModified: 1,
      name: "ss",
      size: 1,
      type: "jpg",
      slice: () => null,
      preview: "lksdokskso"
    } as any
  };

  it("should not remove profile image", () => {
    const a = mappings.mapUserWriteUpdate(userInput);
    expect(a.get("profile_image")).not.toBeFalsy();
  });

  it("should remove profile image", () => {
    const a = mappings.mapUserWriteUpdate({
      ...userInput,
      profile_image: "koijkwoijkos"
    });
    expect(a.get("profile_image")).toBeFalsy();
  });
});
