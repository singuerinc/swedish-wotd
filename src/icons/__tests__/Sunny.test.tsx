import { shallow } from "enzyme";
import * as React from "react";
import { Sunny } from "../Sunny";

describe("<Sunny />", () => {
  describe("icon", () => {
    it("should contain the icon", () => {
      expect(shallow(<Sunny />).find("svg")).toHaveLength(1);
    });
  });
});
