import * as utils from "../utils";
import { getEnvironmentConfigItem } from "../../../Config";
import { createLocalStorageMock } from "../../../test.helpers";
import userMock from "../__mocks__/user.mock";
import tokenMock from "../__mocks__/token.mock";
import userOrgMock from "../__mocks__/user-organisation.mock";

describe("user utils", () => {
  beforeEach(() => {
    createLocalStorageMock({
      [getEnvironmentConfigItem("AUTH_LOCAL_STORAGE")]: JSON.stringify({
        organisation: {
          organisation: 1
        },
        user: {}
      })
    });
  });

  describe("getOrganisationId", () => {
    it("Should return the org id", () => {
      const organisation = utils.getOrganisationId();
      expect(organisation).toBe(1);
    });
  });

  describe("removeUserData", () => {
    it("Should remove item", () => {
      utils.removeUserData();
      try {
        utils.getOrganisationId();
      } catch (e) {
        expect(e.message).toBe("User has no organisation defined.");
      }
    });
  });

  describe("setUserData", () => {
    it("Should set the org", () => {
      utils.setUserData({
        organisation: userOrgMock,
        user: userMock,
        authentication: tokenMock
      });
      const organisation = utils.getOrganisationId();
      expect(organisation).toBe(userOrgMock.organisation);
    });
  });
});
