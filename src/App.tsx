import * as React from "react";
import { InfoButton } from "./components/buttons/InfoButton";
import { ThemeButton } from "./components/buttons/ThemeButton";

import { ReloadButton } from "./components/buttons/ReloadButton";
import { SmallWord } from "./components/SmallWord";
import { Word } from "./components/Word";
import { WordCounter } from "./components/WordCounter";
import {
  analitycs,
  loadDictionary,
  loadTheme,
  loadWordCount,
  save
} from "./utils/impure";
import { onSpacePress } from "./utils/keys";
import {
  incrementTheme,
  incrementWordCount,
  updateDictionary,
  updateWordInEnglish,
  updateWordInSpanish,
  updateWordInSwedish
} from "./utils/store";
import { words as defaultDictionary } from "./utils/words";

const LOCAL_STORAGE_WORDS = "words";
const LOCAL_STORAGE_WORD_COUNT = "word_count";
const LOCAL_STORAGE_THEME = "theme";

const saveDictionary = (dictionary: string[][]) =>
  save(localStorage, LOCAL_STORAGE_WORDS, JSON.stringify(dictionary));
const saveWordCount = (wordCount: number) =>
  save(localStorage, LOCAL_STORAGE_WORD_COUNT, JSON.stringify(wordCount));
const saveTheme = (theme: number) =>
  save(localStorage, LOCAL_STORAGE_THEME, theme);

interface IState {
  theme: number;
  words: string[][];
  wordCount: number;
  wordInEnglish: string | null;
  wordInSwedish: string | null;
  wordInSpanish: string | null;
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    window.addEventListener("keydown", onSpacePress(this.load));

    const dictionary: string[][] = loadDictionary(
      localStorage,
      LOCAL_STORAGE_WORDS,
      defaultDictionary
    );
    saveDictionary(dictionary);

    const theme = loadTheme(localStorage, LOCAL_STORAGE_THEME);
    saveTheme(theme);

    const wordCount = loadWordCount(localStorage, LOCAL_STORAGE_WORD_COUNT);

    this.state = {
      theme,
      wordCount,
      wordInEnglish: null,
      wordInSwedish: null,
      wordInSpanish: null,
      words: dictionary
    };
  }

  public componentDidMount() {
    this.load();
  }

  public render() {
    const {
      wordCount,
      wordInEnglish,
      wordInSwedish,
      wordInSpanish,
      theme
    } = this.state;

    if (wordInEnglish && wordInSpanish && wordInSwedish) {
      return (
        <div className={`app-container theme-${theme}`}>
          <div className="word-container">
            <Word word={wordInSpanish} />
            <div className="small-words-container">
              <SmallWord word={wordInEnglish} />
              <span className="small">/</span>
              <SmallWord word={wordInSwedish} />
            </div>
            <WordCounter counter={wordCount} />
          </div>
          <ul className="settings">
            <li>
              <InfoButton onClick={this.info} />
            </li>
            <li>
              <ReloadButton onClick={this.load} />
            </li>
            <li>
              <ThemeButton theme={theme} onClick={this.changeTheme} />
            </li>
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  private info = () => {
    window.open("https://github.com/singuerinc/spanish-wotd");
  };

  private changeTheme = () => {
    this.setState(incrementTheme, () => {
      saveTheme(this.state.theme);
    });
  };

  private load = () => {
    const [
      [wordInSwedish, wordInEnglish, wordInSpanish],
      ...dictionary
    ] = this.state.words;

    this.setState(updateWordInEnglish(wordInEnglish));
    this.setState(updateWordInSpanish(wordInSpanish));
    this.setState(updateWordInSwedish(wordInSwedish));
    this.setState(incrementWordCount, () => {
      const { wordCount } = this.state;

      analitycs(wordCount);
      saveWordCount(wordCount);
    });

    this.setState(updateDictionary(dictionary), () => {
      if (dictionary.length === 0) {
        // we don't have more words to show,
        // fallback to the default dictionary
        this.setState(updateDictionary(defaultDictionary), () => {
          saveDictionary(this.state.words);
        });
      } else {
        saveDictionary(dictionary);
      }
    });
  };
}

export { App };
