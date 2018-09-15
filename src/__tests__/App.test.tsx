import { shallow } from "enzyme";
import * as React from "react";
import { App } from "../App";
import { InfoButton } from "../components/buttons/InfoButton";
import { ReloadButton } from "../components/buttons/ReloadButton";
import { ThemeButton } from "../components/buttons/ThemeButton";
import { SmallWord } from "../components/SmallWord";
import { Word } from "../components/Word";
import { WordCounter } from "../components/WordCounter";

describe("<App />", () => {
  describe("children", () => {
    it("should contain the word container", () => {
      const wrapper = shallow(<App />);

      const wordContainer = wrapper.find(".word-container");

      const word = wordContainer.find(Word);
      const smallWord = wordContainer.find(SmallWord);
      const wordCounter = wordContainer.find(WordCounter);

      expect(wordContainer).toHaveLength(1);
      expect(word).toHaveLength(1);
      expect(smallWord).toHaveLength(1);
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
});
