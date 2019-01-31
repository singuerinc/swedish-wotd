import {
  incrementTheme,
  incrementWordCount,
  updateDictionary,
  updateWordInEnglish,
  updateWordInSpanish
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

  describe("updateWordInSpanish", () => {
    it("should update the word in Spanish", () => {
      expect(updateWordInSpanish("hola")()).toStrictEqual({
        wordInSpanish: "hola"
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
