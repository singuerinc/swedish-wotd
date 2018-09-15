export function analitycs(count: number) {
  try {
    // @ts-ignore
    gtag("event", "word", {
      event_category: "load",
      event_label: "count",
      value: count
    });
  } catch (e) {}
}

export function get(from: string) {
  return localStorage.getItem(from);
}

export function save(where: string, what: any): void {
  localStorage.setItem(where, String(what));
}

export function localDictionaryOrFallback(local: string, fallback: string[][]) {
  try {
    // get dictionary from localStorage
    const dictionary: string[][] = JSON.parse(get(local) as string);

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

export function localThemeOrFallback(local: string, fallback: number): number {
  const localTheme = get(local);
  return localTheme ? parseInt(localTheme, 10) : fallback;
}

export function localCountOrFallback(local: string, fallback: number): number {
  return parseInt(get(local) as string, 10) || fallback;
}
