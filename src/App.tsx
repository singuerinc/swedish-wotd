import * as React from "react";
import { withBaseButton } from "./BaseButton";
import { InfoIcon } from "./icons/InfoIcon";
import { ReloadIcon } from "./icons/ReloadIcon";
import { ThemeButton } from "./ThemeButton";
import {
  analitycs,
  localCountOrFallback,
  localDictionaryOrFallback,
  localThemeOrFallback,
  save
} from "./utils";
import { Word } from "./Word";
import { WordsCounter } from "./WordCounter";
import { words as oWords } from "./words";

const InfoButton = withBaseButton(InfoIcon);
const ReloadButton = withBaseButton(ReloadIcon);

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
      oWords
    );
    save(LOCAL_STORAGE_WORDS, JSON.stringify(dictionary));

    const theme = localThemeOrFallback(LOCAL_STORAGE_THEME, 0);
    save(LOCAL_STORAGE_THEME, theme);

    const wordCount = localCountOrFallback(LOCAL_STORAGE_WORD_COUNT, 0);

    this.state = {
      theme,
      wordCount: wordCount + 1,
      wordInEnglish: null,
      wordInSwedish: null,
      words: dictionary
    };
  }

  public info = () => {
    window.open("https://github.com/singuerinc/swedish-wotd");
  };

  public changeTheme = () => {
    const theme = (this.state.theme + 1) % 3;

    save(LOCAL_STORAGE_THEME, theme);

    this.setState({
      theme
    });
  };

  public load = () => {
    const { words, wordCount } = this.state;
    const [[wordInSwedish, wordInEnglish], ...rest] = words;

    save(LOCAL_STORAGE_WORDS, JSON.stringify(rest));
    save(LOCAL_STORAGE_WORD_COUNT, JSON.stringify(wordCount));

    const count = wordCount + 1;

    analitycs(count);

    this.setState({
      words: rest,
      wordCount: count,
      wordInEnglish,
      wordInSwedish
    });

    if (this.state.words.length === 0) {
      this.setState({
        words: oWords
      });

      save(LOCAL_STORAGE_WORDS, JSON.stringify(oWords));
    }
  };

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
}

export { App };
