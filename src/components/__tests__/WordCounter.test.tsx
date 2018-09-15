import { shallow } from "enzyme";
import * as React from "react";
import { WordCounter } from "../WordCounter";

describe("<WordCounter />", () => {
  describe("children", () => {
    it("should contain a <h3 /> tag and text 3", () => {
      const props = {
        counter: 3
      };

      const wrapper = shallow(<WordCounter {...props} />);

      expect(wrapper.find("h3")).toHaveLength(1);
      expect(wrapper.prop("className")).toBe("word-counter");
      expect(wrapper.text()).toBe("3");
    });
  });
});
