import { shallow } from "enzyme";
import * as React from "react";
import { Word } from "../Word";

describe("<Word />", () => {
  describe("children", () => {
    it("should contain a <h1 /> tag and text hello", () => {
      const props = {
        word: "hello"
      };

      const wrapper = shallow(<Word {...props} />);

      expect(wrapper.find("h1")).toHaveLength(1);
      expect(wrapper.text()).toBe("hello");
      expect(wrapper.prop("className")).toBeUndefined();
    });
  });
});
