import { shallow } from "enzyme";
import * as React from "react";
import { Cloudy } from "../Cloudy";

describe("<Cloudy />", () => {
  describe("icon", () => {
    it("should contain the icon", () => {
      expect(shallow(<Cloudy />).find("svg")).toHaveLength(1);
    });
  });
});
