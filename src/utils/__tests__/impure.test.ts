import { get, loadDictionary, loadTheme, loadWordCount, save } from "../impure";

describe("impure", () => {
  describe("getItem", () => {
    it("should return a null value if it does not exist", () => {
      const localStorageStub = {
        getItem: jest.fn().mockImplementation(() => null),
        setItem: jest.fn()
      };

      expect(get(localStorageStub, "foo")).toBeNull();
    });

    it("should return a the value if it is stored", () => {
      const localStorageStub = {
        getItem: jest.fn().mockImplementation(() => "bar"),
        setItem: jest.fn()
      };

      expect(get(localStorageStub, "foo")).toBe("bar");
    });
  });

  describe("setItem", () => {
    it("should return a false if it is not possible to write in the localStorage", () => {
      const localStorageStub = {
        getItem: jest.fn(),
        setItem: jest.fn().mockImplementation(() => {
          throw new Error();
        })
      };

      expect(save(localStorageStub, "foo", "bar")).toBeFalsy();
    });

    it("should return a the value if it is stored", () => {
      const localStorageStub = {
        setItem: jest.fn(),
        getItem: jest.fn()
      };

      expect(save(localStorageStub, "foo", "bar")).toBeTruthy();
    });
  });

  describe("loadTheme", () => {
    it("should return the theme stored as number", () => {
      const localStorageStub = {
        getItem: jest.fn().mockImplementation(() => "1"),
        setItem: jest.fn()
      };

      expect(loadTheme(localStorageStub, "foo")).toBe(1);
    });

    it("should return 0 when there is no theme stored", () => {
      const localStorageStub = {
        getItem: jest.fn().mockImplementation(() => null),
        setItem: jest.fn()
      };

      expect(loadTheme(localStorageStub, "foo")).toBe(0);
    });
  });

  describe("loadWordCount", () => {
    it("should return the word count stored as number", () => {
      const localStorageStub = {
        getItem: jest.fn().mockImplementation(() => "10"),
        setItem: jest.fn()
      };

      expect(loadWordCount(localStorageStub, "foo")).toBe(10);
    });

    it("should return 0 when there is no counter stored", () => {
      const localStorageStub = {
        getItem: jest.fn().mockImplementation(() => null),
        setItem: jest.fn()
      };

      expect(loadWordCount(localStorageStub, "foo")).toBe(0);
    });
  });

  describe("loadDictionary", () => {
    it("should return the dictionary stored", () => {
      const localStorageStub = {
        getItem: jest
          .fn()
          .mockImplementation(() => '[["hello","hej"],["bye bye","hejdå"]]'),
        setItem: jest.fn()
      };

      expect(loadDictionary(localStorageStub, "foo", [])).toStrictEqual([
        ["hello", "hej"],
        ["bye bye", "hejdå"]
      ]);
    });

    it("should return the fallback dictionary if is not stored", () => {
      const localStorageStub = {
        getItem: jest.fn().mockImplementation(() => null),
        setItem: jest.fn()
      };

      expect(
        loadDictionary(localStorageStub, "foo", [
          ["hello", "hej"],
          ["bye bye", "hejdå"]
        ])
      ).toStrictEqual([["hello", "hej"], ["bye bye", "hejdå"]]);
    });

    it("should return the fallback dictionary if the stored dictionary does not contain anything", () => {
      const localStorageStub = {
        getItem: jest.fn().mockImplementation(() => "[]"),
        setItem: jest.fn()
      };

      expect(
        loadDictionary(localStorageStub, "foo", [
          ["hello", "hej"],
          ["bye bye", "hejdå"]
        ])
      ).toStrictEqual([["hello", "hej"], ["bye bye", "hejdå"]]);
    });
  });
});
