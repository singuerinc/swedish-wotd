export function analitycs(count: number) {
  try {
    // @ts-ignore
    gtag("event", "word", {
      event_category: "load",
      event_label: "count",
      value: count
    });
  } catch (e) {
    //
  }
}

export function get(ls: Storage, from: string) {
  return ls.getItem(from);
}

export function save(ls: Storage, where: string, what: any): boolean {
  try {
    ls.setItem(where, String(what));
    return true;
  } catch (e) {
    return false;
  }
}

export function loadDictionary(
  ls: Storage,
  local: string,
  fallback: string[][]
) {
  try {
    // get dictionary from localStorage
    const dictionary: string[][] = JSON.parse(get(ls, local) as string);

    // if we don't have any more words fallback to the app dictionary
    if (dictionary.length <= 0) {
      throw new Error();
    } else {
      return dictionary;
    }
  } catch (e) {
    return fallback;
  }
}

export function loadTheme(ls: Storage, local: string): number {
  try {
    const localTheme = get(ls, local);
    if (localTheme === null) {
      throw new Error();
    }
    return parseInt(localTheme as string, 10);
  } catch (e) {
    // default
    return 0;
  }
}

export function loadWordCount(ls: Storage, local: string) {
  try {
    const lsValue = get(ls, local);
    if (lsValue === null) {
      throw new Error();
    }
    const value = parseInt(lsValue as string, 10);
    return value;
  } catch (e) {
    // default
    return 0;
  }
}
