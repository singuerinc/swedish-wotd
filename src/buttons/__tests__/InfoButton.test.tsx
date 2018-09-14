import { shallow } from "enzyme";
import * as React from "react";
import { InfoIcon } from "../../icons/InfoIcon";
import { InfoButton } from "../InfoButton";

describe("<InfoButton />", () => {
  describe("children", () => {
    it("should contain a <InfoIcon /> component", () => {
      const props = {
        onClick: () => {}
      };

      const wrapper = shallow(<InfoButton {...props} />);
      expect(wrapper.find(InfoIcon)).toHaveLength(1);
    });
  });

  describe("click", () => {
    it("should call onClick when is clicked", () => {
      const props = {
        theme: 0,
        onClick: jest.fn()
      };

      const wrapper = shallow(<InfoButton {...props} />);
      wrapper.simulate("click");

      expect(props.onClick).toBeCalledTimes(1);
    });
  });
});
