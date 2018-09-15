import { shallow } from "enzyme";
import * as React from "react";
import { InfoIcon } from "../../../icons/InfoIcon";
import { withBaseButton } from "../BaseButton";

describe("withBaseButton", () => {
  describe("component", () => {
    it("should contain a div container", () => {
      const props = {
        onClick: () => {}
      };

      const InfoButton = withBaseButton(InfoIcon);
      const wrapper = shallow(<InfoButton {...props} />);

      const div = wrapper.find("div");
      expect(div).toHaveLength(1);
      expect(div.find(InfoIcon)).toHaveLength(1);
    });
  });

  describe("props", () => {
    it("should contain a div container", () => {
      const props = {
        onClick: () => {}
      };

      const InfoButton = withBaseButton(InfoIcon);
      const wrapper = shallow(<InfoButton {...props} />);

      expect(wrapper.prop("onClick")).toBe(props.onClick);
    });
  });
});
