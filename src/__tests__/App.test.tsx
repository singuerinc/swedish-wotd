import { shallow } from "enzyme";
import * as React from "react";
import { App } from "../App";
import { InfoButton } from "../components/buttons/InfoButton";
import { ReloadButton } from "../components/buttons/ReloadButton";
import { ThemeButton } from "../components/buttons/ThemeButton";
import { SmallWord } from "../components/SmallWord";
import { Word } from "../components/Word";
import { WordCounter } from "../components/WordCounter";
import { onSpacePress } from "../utils/keys";
jest.mock("../utils/keys");

describe.skip("<App />", () => {
  describe("children", () => {
    it("should contain the word container", () => {
      const wrapper = shallow(<App />);

      const wordContainer = wrapper.find(".word-container");

      const word = wordContainer.find(Word);
      const smallWord = wordContainer.find(SmallWord);
      const wordCounter = wordContainer.find(WordCounter);

      expect(wordContainer).toHaveLength(1);
      expect(word).toHaveLength(1);
      expect(smallWord).toHaveLength(2);
      expect(wordCounter).toHaveLength(1);
    });

    it("should contain the settings", () => {
      const wrapper = shallow(<App />);
      const settings = wrapper.find(".settings");

      expect(settings).toHaveLength(1);

      expect(settings.find("li")).toHaveLength(3);

      const li1 = settings.find("li").at(0);
      const li2 = settings.find("li").at(1);
      const li3 = settings.find("li").at(2);

      expect(li1.find(InfoButton)).toHaveLength(1);
      expect(li2.find(ReloadButton)).toHaveLength(1);
      expect(li3.find(ThemeButton)).toHaveLength(1);
    });
  });

  describe("keypress listener", () => {
    it("should add a listener to load a new word", () => {
      const wrapper = shallow(<App />);
      wrapper.simulate("keypress");

      const callback = expect.any(Function);

      expect(onSpacePress).toHaveBeenCalledWith(callback);
    });
  });

  describe("info", () => {
    it("should call info when click on info button", () => {
      const wrapper = shallow(<App />);
      const info = wrapper.find(InfoButton);

      window.open = jest.fn();

      info.simulate("click");

      expect(window.open).toBeCalledWith(
        "https://github.com/singuerinc/spanish-wotd"
      );
    });
  });

  describe("changeTheme", () => {
    it("should call changeTheme when click on theme button", () => {
      const wrapper = shallow(<App />);
      const app = wrapper.instance();
      app.setState = jest.fn().mockImplementation((state, callback) => {
        if (callback) {
          callback();
        }
      });

      const themeBtn = wrapper.find(ThemeButton);
      themeBtn.simulate("click");

      expect(app.setState).toBeCalledWith(
        expect.any(Function),
        expect.any(Function)
      );
    });
  });

  describe("load", () => {
    it("should load the default dictionary when there are no more words in local", () => {
      const wrapper = shallow(<App />);
      const app: App = wrapper.instance();
      app.setState = jest.fn().mockImplementation((state, callback) => {
        if (callback) {
          callback();
        }
      });

      wrapper.setState({
        words: [["hello", "hej", "hola"]]
      });
      app.load();

      expect(app.setState).toBeCalledTimes(6);
    });
  });
});
