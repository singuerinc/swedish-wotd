import axios from "axios";
import * as React from "react";
import words from "./google-10000-english";
import { IWord } from "./IWord";
import { ReloadButton } from "./ReloadButton";
import { Word } from "./Word";
import { withTranslator } from "./WordTranslator";

const clean = (x: string) =>
  (/<strong>:<\/strong>(\D+)<strong>:<\/strong>/.exec(x) as RegExpExecArray)[1];
const randomIn = (x: string[]) => x[Math.floor(Math.random() * x.length)];
const WordTranslator = withTranslator(Word);
const SmallWord = ({ word }: { word: IWord }) => (
  <Word className="small" word={word} />
);

interface IState {
  word: IWord | null;
  errorRetry: number;
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      errorRetry: 0,
      word: null
    };
  }

  public load() {
    // axios.get(`/.netlify/functions/wotd`).then(({ data }) => {
    //   this.setState({
    //     word: data
    //   });
    // });

    const word = randomIn(words);
    this.setState({
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
