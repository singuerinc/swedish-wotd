import * as React from "react";
import { InfoButton } from "./InfoButton";
import { ReloadButton } from "./ReloadButton";
import { ThemeButton } from "./ThemeButton";
import { Word } from "./Word";
import { WordsCounter } from "./WordCounter";
import { words as oWords } from "./words";
import { WordsLeft } from "./WordsLeft";

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
      if (e.keyCode === 82 || e.keyCode === 32) {
        // R key or Space
        this.load();
      }
    });

    let savedWords: string[][];

    try {
      savedWords = JSON.parse(localStorage.getItem(
        LOCAL_STORAGE_WORDS
      ) as string);

      if (savedWords.length <= 0) {
        // get words from network
        throw new Error();
      }
    } catch (e) {
      savedWords = oWords;
      localStorage.setItem(LOCAL_STORAGE_WORDS, JSON.stringify(savedWords));
    }

    const localTheme = localStorage.getItem(LOCAL_STORAGE_THEME);
    const theme = localTheme ? parseInt(localTheme, 10) : 0;

    localStorage.setItem(LOCAL_STORAGE_THEME, theme.toString());

    const wordCount =
      parseInt(localStorage.getItem(LOCAL_STORAGE_WORD_COUNT) as string, 10) ||
      0;

    this.state = {
      theme,
      wordCount,
      wordInEnglish: null,
      wordInSwedish: null,
      words: savedWords
    };
  }

  public info = () => {
    window.open("https://github.com/singuerinc/swedish-wotd");
  };

  public changeTheme = () => {
    this.setState(
      prevState => ({
        theme: (prevState.theme + 1) % 3
      }),
      () => {
        localStorage.setItem(LOCAL_STORAGE_THEME, this.state.theme.toString());
      }
    );
  };

  public load = () => {
    const [word, ...rest] = this.state.words;

    localStorage.setItem(LOCAL_STORAGE_WORDS, JSON.stringify(rest));
    localStorage.setItem(LOCAL_STORAGE_WORD_COUNT, JSON.stringify(rest));

    this.setState(prevState => ({
      words: rest,
      wordCount: prevState.wordCount + 1,
      wordInEnglish: word[1],
      wordInSwedish: word[0]
    }));

    if (this.state.words.length === 0) {
      this.setState({
        words: oWords
      });
      localStorage.setItem(LOCAL_STORAGE_WORDS, JSON.stringify(oWords));
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
