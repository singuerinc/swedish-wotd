import { shallow } from "enzyme";
import * as React from "react";
import { SmallWord } from "../SmallWord";
import { Word } from "../Word";

describe("<SmallWord />", () => {
  describe("children", () => {
    it("should contain a <h1 /> tag and text hello", () => {
      const props = {
        word: "hello"
      };

      const wrapper = shallow(<SmallWord {...props} />);

      expect(wrapper.find(Word)).toHaveLength(1);
      expect(wrapper.prop("word")).toBe("hello");
      expect(wrapper.prop("className")).toBe("small");
    });
  });
});
