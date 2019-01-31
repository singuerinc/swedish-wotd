import { get, loadDictionary, loadTheme, loadWordCount, save } from "../impure";

const lsStub: Storage = {
  clear: jest.fn(),
  getItem: jest.fn(),
  key: jest.fn(),
  length: 1,
  removeItem: jest.fn(),
  setItem: jest.fn()
};

describe("impure", () => {
  describe("getItem", () => {
    it("should return a null value if it does not exist", () => {
      const localStorageStub: Storage = {
        ...lsStub,
        getItem: jest.fn().mockImplementation(() => null)
      };

      expect(get(localStorageStub, "foo")).toBeNull();
    });

    it("should return a the value if it is stored", () => {
      const localStorageStub = {
        ...lsStub,
        getItem: jest.fn().mockImplementation(() => "bar")
      };

      expect(get(localStorageStub, "foo")).toBe("bar");
    });
  });

  describe("setItem", () => {
    it("should return a false if it is not possible to write in the localStorage", () => {
      const localStorageStub = {
        ...lsStub,
        setItem: jest.fn().mockImplementation(() => {
          throw new Error();
        })
      };

      expect(save(localStorageStub, "foo", "bar")).toBeFalsy();
    });

    it("should return a the value if it is stored", () => {
      const localStorageStub = {
        ...lsStub
      };

      expect(save(localStorageStub, "foo", "bar")).toBeTruthy();
    });
  });

  describe("loadTheme", () => {
    it("should return the theme stored as number", () => {
      const localStorageStub = {
        ...lsStub,
        getItem: jest.fn().mockImplementation(() => "1")
      };

      expect(loadTheme(localStorageStub, "foo")).toBe(1);
    });

    it("should return 0 when there is no theme stored", () => {
      const localStorageStub = {
        ...lsStub,
        getItem: jest.fn().mockImplementation(() => null)
      };

      expect(loadTheme(localStorageStub, "foo")).toBe(0);
    });
  });

  describe("loadWordCount", () => {
    it("should return the word count stored as number", () => {
      const localStorageStub = {
        ...lsStub,
        getItem: jest.fn().mockImplementation(() => "10")
      };

      expect(loadWordCount(localStorageStub, "foo")).toBe(10);
    });

    it("should return 0 when there is no counter stored", () => {
      const localStorageStub = {
        ...lsStub,
        getItem: jest.fn().mockImplementation(() => null)
      };

      expect(loadWordCount(localStorageStub, "foo")).toBe(0);
    });
  });

  describe("loadDictionary", () => {
    it("should return the dictionary stored", () => {
      const localStorageStub = {
        ...lsStub,
        getItem: jest
          .fn()
          .mockImplementation(
            () => '[["hej", "hello", "hola"],["hejdå", "bye bye", "chau"]]'
          )
      };

      expect(loadDictionary(localStorageStub, "foo", [])).toStrictEqual([
        ["hej", "hello", "hola"],
        ["hejdå", "bye bye", "chau"]
      ]);
    });

    it("should return the fallback dictionary if is not stored", () => {
      const localStorageStub = {
        ...lsStub,
        getItem: jest.fn().mockImplementation(() => null)
      };

      expect(
        loadDictionary(localStorageStub, "foo", [
          ["hej", "hello", "hola"],
          ["hejdå", "bye bye", "chau"]
        ])
      ).toStrictEqual([["hej", "hello", "hola"], ["hejdå", "bye bye", "chau"]]);
    });

    it("should return the fallback dictionary if the stored dictionary does not contain anything", () => {
      const localStorageStub = {
        ...lsStub,
        getItem: jest.fn().mockImplementation(() => "[]")
      };

      expect(
        loadDictionary(localStorageStub, "foo", [
          ["hej", "hello", "hola"],
          ["hejdå", "bye bye", "chau"]
        ])
      ).toStrictEqual([["hej", "hello", "hola"], ["hejdå", "bye bye", "chau"]]);
    });
  });
});
