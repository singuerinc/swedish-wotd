import { shallow } from "enzyme";
import * as React from "react";
import { Night } from "../Night";

describe("<Night />", () => {
  describe("icon", () => {
    it("should contain the icon", () => {
      expect(shallow(<Night />).find("svg")).toHaveLength(1);
    });
  });
});
