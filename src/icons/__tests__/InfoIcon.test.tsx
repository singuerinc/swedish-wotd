import { shallow } from "enzyme";
import * as React from "react";
import { InfoIcon } from "../InfoIcon";

describe("<InfoIcon />", () => {
  describe("icon", () => {
    it("should contain the icon", () => {
      expect(shallow(<InfoIcon />).find("svg")).toHaveLength(1);
    });
  });
});
