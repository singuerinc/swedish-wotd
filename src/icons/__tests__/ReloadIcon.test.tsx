import { shallow } from "enzyme";
import * as React from "react";
import { ReloadIcon } from "../ReloadIcon";

describe("<ReloadIcon />", () => {
  describe("icon", () => {
    it("should contain the icon", () => {
      expect(shallow(<ReloadIcon />).find("svg")).toHaveLength(1);
    });
  });
});
