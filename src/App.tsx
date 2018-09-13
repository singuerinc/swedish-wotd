import axios from "axios";
import * as React from "react";
import words from "./google-10000-english";
import { InfoButton } from "./InfoButton";
import { IWord } from "./IWord";
import { ReloadButton } from "./ReloadButton";
import { ThemeButton } from "./ThemeButton";
import { Word } from "./Word";
import { withTranslator } from "./WordTranslator";

const LOCAL_STORAGE_WORDS = "words";
const LOCAL_STORAGE_THEME = "theme";

const clean = (x: string) =>
  (/<strong>:<\/strong>(\D+)<strong>:<\/strong>/.exec(x) as RegExpExecArray)[1];
const randomIn = (x: string[]) => x[Math.floor(Math.random() * x.length)];
const WordTranslator = withTranslator(Word);
const SmallWord = ({ word }: { word: IWord }) => (
  <Word className="small" word={word} />
);

const shuffle = (arr: string[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

interface IState {
  errorRetry: number;
  theme: number;
  words: string[];
  word: IWord | null;
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    let savedWords: string[];

    try {
      savedWords = JSON.parse(localStorage.getItem(
        LOCAL_STORAGE_WORDS
      ) as string);

      if (savedWords.length <= 0) {
        // get words from network
        throw new Error();
      }
    } catch (e) {
      savedWords = shuffle(words);
      localStorage.setItem(LOCAL_STORAGE_WORDS, JSON.stringify(savedWords));
    }

    const localTheme = localStorage.getItem(LOCAL_STORAGE_THEME);
    const theme = localTheme ? parseInt(localTheme, 10) : 0;

    localStorage.setItem(LOCAL_STORAGE_THEME, theme.toString());

    this.state = {
      errorRetry: 0,
      theme,
      word: null,
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
    // axios.get(`/.netlify/functions/wotd`).then(({ data }) => {
    //   this.setState({
    //     word: data
    //   });
    // });

    // get the fist words
    const [word, ...rest] = this.state.words;
    localStorage.setItem(LOCAL_STORAGE_WORDS, JSON.stringify(rest));

    this.setState({
      words: rest,
      word: {
        title: word,
        description: "",
        link: "",
        date: ""
      }
    });
  };

  public onTranlationError(e: Error) {
    this.setState(
      (prevState: IState) => ({
        errorRetry: prevState.errorRetry + 1
      }),
      () => {
        if (this.state.errorRetry < 5) {
          this.load();
        }
      }
    );
  }

  public onTranslationSuccess(word: string) {
    this.setState({
      errorRetry: 0
    });
  }

  public componentDidMount() {
    this.load();
  }

  public render() {
    const { word, theme } = this.state;

    // <div dangerouslySetInnerHTML={{ __html: clean(word.description) }} />;
    // <a href={word.link}>{word.link}</a>

    if (word) {
      return (
        <div className={`app-container theme-${theme}`}>
          <div className="word-container">
            <WordTranslator
              onError={(e: Error) => this.onTranlationError(e)}
              onSuccess={(word: string) => this.onTranslationSuccess(word)}
              word={word}
            />
            <SmallWord word={word} />
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
