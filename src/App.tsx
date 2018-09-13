import * as React from "react";
import { InfoButton } from "./InfoButton";
import { ReloadButton } from "./ReloadButton";
import { ThemeButton } from "./ThemeButton";
import { Word } from "./Word";
import { words } from "./words";

const LOCAL_STORAGE_WORDS = "words";
const LOCAL_STORAGE_THEME = "theme";

const SmallWord = ({ word }: { word: string }) => (
  <Word className="small" word={word} />
);

interface IState {
  errorRetry: number;
  theme: number;
  words: string[][];
  wordInEnglish: string | null;
  wordInSwedish: string | null;
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

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
      savedWords = words;
      localStorage.setItem(LOCAL_STORAGE_WORDS, JSON.stringify(savedWords));
    }

    const localTheme = localStorage.getItem(LOCAL_STORAGE_THEME);
    const theme = localTheme ? parseInt(localTheme, 10) : 0;

    localStorage.setItem(LOCAL_STORAGE_THEME, theme.toString());

    this.state = {
      errorRetry: 0,
      theme,
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

    this.setState({
      words: rest,
      wordInEnglish: word[0],
      wordInSwedish: word[1]
    });
  };

  public componentDidMount() {
    this.load();
  }

  public render() {
    const { wordInEnglish, wordInSwedish, theme } = this.state;

    if (wordInEnglish && wordInSwedish) {
      return (
        <div className={`app-container theme-${theme}`}>
          <div className="word-container">
            <Word word={wordInSwedish} />
            <SmallWord word={wordInEnglish} />
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
