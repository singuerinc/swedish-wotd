import {
  incrementTheme,
  incrementWordCount,
  updateDictionary,
  updateWordInEnglish,
  updateWordInSwedish
} from "../store";

describe("store", () => {
  describe("incrementTheme", () => {
    it("should increment the theme to 1", () => {
      expect(incrementTheme({ theme: 0 })).toStrictEqual({ theme: 1 });
    });

    it("should increment the theme to 2", () => {
      expect(incrementTheme({ theme: 1 })).toStrictEqual({ theme: 2 });
    });

    it("should increment the theme to 0", () => {
      expect(incrementTheme({ theme: 2 })).toStrictEqual({ theme: 0 });
    });
  });

  describe("incrementWordCount", () => {
    it("should increment the word counter by 1", () => {
      expect(incrementWordCount({ wordCount: 0 })).toStrictEqual({
        wordCount: 1
      });
    });

    it("should increment the word counter by 1", () => {
      expect(incrementWordCount({ wordCount: 10 })).toStrictEqual({
        wordCount: 11
      });
    });
  });

  describe("updateWordInEnglish", () => {
    it("should update the word in English", () => {
      expect(updateWordInEnglish("hello")()).toStrictEqual({
        wordInEnglish: "hello"
      });
    });
  });

  describe("updateWordInSwedish", () => {
    it("should update the word in Swedish", () => {
      expect(updateWordInSwedish("hej")()).toStrictEqual({
        wordInSwedish: "hej"
      });
    });
  });

  describe("updateDictionary", () => {
    it("should update the dictionary", () => {
      const dict: string[][] = [["hello", "hej"], ["bye bye", "hejdå"]];
      expect(updateDictionary(dict)()).toStrictEqual({
        words: [["hello", "hej"], ["bye bye", "hejdå"]]
      });
    });
  });
});
