import axios from "axios";
import * as React from "react";
import words from "./google-10000-english";
import { IWord } from "./IWord";
import { ReloadButton } from "./ReloadButton";
import { Word } from "./Word";
import { withTranslator } from "./WordTranslator";

const LOCAL_STORAGE_WORDS = "words";
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
  words: string[];
  word: IWord | null;
  errorRetry: number;
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

    this.state = {
      errorRetry: 0,
      word: null,
      words: savedWords
    };
  }

  public load() {
    // axios.get(`/.netlify/functions/wotd`).then(({ data }) => {
    //   this.setState({
    //     word: data
    //   });
    // });

    // get the fist words
    const [word, ...rest] = this.state.words;
    localStorage.setItem(LOCAL_STORAGE_WORDS, JSON.stringify(rest));

    console.log("saving to local storage:", rest.length);

    this.setState({
      words: rest,
      word: {
        title: word,
        description: "",
        link: "",
        date: ""
      }
    });
  }

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
    console.log("gotcha", word);
    this.setState({
      errorRetry: 0
    });
  }

  public componentDidMount() {
    this.load();
  }

  public render() {
    const { word } = this.state;

    // <div dangerouslySetInnerHTML={{ __html: clean(word.description) }} />;
    // <a href={word.link}>{word.link}</a>

    if (word) {
      console.log(word);
      return (
        <div className="app-container">
          <div className="word-container">
            <WordTranslator
              onError={(e: Error) => this.onTranlationError(e)}
              onSuccess={(word: string) => this.onTranslationSuccess(word)}
              word={word}
            />
            <SmallWord word={word} />
          </div>
          <ReloadButton
            onClick={() => {
              this.load();
            }}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export { App };
