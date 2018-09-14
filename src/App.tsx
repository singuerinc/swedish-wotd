import * as React from "react";
import { InfoButton } from "./buttons/InfoButton";
import { ThemeButton } from "./buttons/ThemeButton";

import { ReloadButton } from "./buttons/ReloadButton";
import {
  analitycs,
  localCountOrFallback,
  localDictionaryOrFallback,
  localThemeOrFallback,
  save
} from "./impure";
import {
  incrementTheme,
  incrementWordCount,
  updateDictionary,
  updateWordInEnglish,
  updateWordInSwedish
} from "./store";
import { Word } from "./Word";
import { WordsCounter } from "./WordCounter";
import { words as defaultDictionary } from "./words";

const LOCAL_STORAGE_WORDS = "words";
const LOCAL_STORAGE_WORD_COUNT = "word_count";
const LOCAL_STORAGE_THEME = "theme";

const SmallWord = ({ word }: { word: string }) => (
  <Word className="small" word={word} />
);

interface IState {
  theme: number;
  words: string[][];
  wordCount: number;
  wordInEnglish: string | null;
  wordInSwedish: string | null;
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.keyCode === 32) {
        // load a new word on Space key press
        this.load();
      }
    });

    const dictionary: string[][] = localDictionaryOrFallback(
      LOCAL_STORAGE_WORDS,
      defaultDictionary
    );
    save(LOCAL_STORAGE_WORDS, JSON.stringify(dictionary));

    const theme = localThemeOrFallback(LOCAL_STORAGE_THEME, 0);
    save(LOCAL_STORAGE_THEME, theme);

    const wordCount = localCountOrFallback(LOCAL_STORAGE_WORD_COUNT, 0);

    this.state = {
      theme,
      wordCount,
      wordInEnglish: null,
      wordInSwedish: null,
      words: dictionary
    };
  }

  public componentDidMount() {
    this.load();
  }

  public render() {
    const { wordCount, wordInEnglish, wordInSwedish, theme } = this.state;

    if (wordInEnglish && wordInSwedish) {
      return (
        <div className={`app-container theme-${theme}`}>
          <div className="word-container">
            <Word word={wordInSwedish} />
            <SmallWord word={wordInEnglish} />
            <WordsCounter counter={wordCount} />
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
    window.open("https://github.com/singuerinc/swedish-wotd");
  };

  private changeTheme = () => {
    this.setState(incrementTheme, () => {
      save(LOCAL_STORAGE_THEME, this.state.theme);
    });
  };

  private load = () => {
    const [[wordInSwedish, wordInEnglish], ...dictionary] = this.state.words;

    this.setState(updateWordInEnglish(wordInEnglish));
    this.setState(updateWordInSwedish(wordInSwedish));
    this.setState(incrementWordCount, () => {
      const { wordCount } = this.state;

      analitycs(wordCount);
      save(LOCAL_STORAGE_WORD_COUNT, JSON.stringify(wordCount));
    });

    this.setState(updateDictionary(dictionary), () => {
      if (this.state.words.length === 0) {
        // we don't have more words to show,
        // fallback to the default dictionary
        this.setState(updateDictionary(defaultDictionary), () => {
          save(LOCAL_STORAGE_WORDS, JSON.stringify(this.state.words));
        });
      } else {
        save(LOCAL_STORAGE_WORDS, JSON.stringify(dictionary));
      }
    });
  };
}

export { App };
