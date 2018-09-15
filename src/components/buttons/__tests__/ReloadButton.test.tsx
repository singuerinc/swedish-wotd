import { shallow } from "enzyme";
import * as React from "react";
import { ReloadIcon } from "../../../icons/ReloadIcon";
import { ReloadButton } from "../ReloadButton";

describe("<ReloadButton />", () => {
  describe("children", () => {
    it("should contain a <ReloadIcon /> component", () => {
      const props = {
        onClick: () => {}
      };

      const wrapper = shallow(<ReloadButton {...props} />);
      expect(wrapper.find(ReloadIcon)).toHaveLength(1);
    });
  });

  describe("click", () => {
    it("should call onClick when is clicked", () => {
      const props = {
        theme: 0,
        onClick: jest.fn()
      };

      const wrapper = shallow(<ReloadButton {...props} />);
      wrapper.simulate("click");

      expect(props.onClick).toBeCalledTimes(1);
    });
  });
});
