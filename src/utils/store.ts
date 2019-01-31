export const incrementTheme = (state: { theme: number }) => ({
  theme: (state.theme + 1) % 3
});

export const incrementWordCount = (state: { wordCount: number }) => ({
  wordCount: state.wordCount + 1
});

export const updateWordInEnglish = (word: string) => () => ({
  wordInEnglish: word
});

export const updateWordInSpanish = (word: string) => () => ({
  wordInSpanish: word
});

export const updateWordInSwedish = (word: string) => () => ({
  wordInSwedish: word
});

export const updateDictionary = (dictionary: string[][]) => () => ({
  words: dictionary
});
