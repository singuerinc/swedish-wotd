import axios from "axios";
import * as isSameDay from "date-fns/is_same_day";
import * as React from "react";
import sanitizeHtml from "sanitize-html";
import { InfoButton } from "./InfoButton";
import { IWord } from "./IWord";
import { ReloadButton } from "./ReloadButton";
import { ThemeButton } from "./ThemeButton";
import { Word } from "./Word";
import { withTranslator } from "./WordTranslator";

const LOCAL_STORAGE = "swotd";

const clean = (x: string) =>
  (/<strong>Examples:<\/strong>[\s]+<\/p><p>(.*)<\/p>*/gim.exec(
    x
  ) as RegExpExecArray)[1];

const WordTranslator = withTranslator(Word);
const SmallWord = ({ word }: { word: IWord }) => (
  <Word className="small" word={word} />
);

interface IState {
  errorRetry: number;
  lastUpdate: number;
  theme: number;
  word: IWord | null;
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    let s: IState;

    try {
      s = JSON.parse(localStorage.getItem(LOCAL_STORAGE) as string);
      if (s === null || s.word === null) {
        throw new Error();
      }
    } catch (e) {
      s = {
        errorRetry: 0,
        lastUpdate: new Date().getTime(),
        theme: 0,
        word: null
      };
    }

    console.log(s);
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(s));

    this.state = {
      ...s,
      errorRetry: 0
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
        localStorage.setItem(LOCAL_STORAGE, JSON.stringify(this.state));
      }
    );
  };

  public load = () => {
    console.log("hey load");
    axios.get(`/.netlify/functions/wotd`).then(({ data }: { data: IWord }) => {
      const word = {
        ...data,
        description: clean(
          sanitizeHtml(data.description, {
            allowedTags: ["p", "strong"]
          })
        )
      };

      this.setState({
        word
      });

      localStorage.setItem(
        LOCAL_STORAGE,
        JSON.stringify({ ...this.state, errorRetry: 0 })
      );
    });
  };

  public onTranlationError(e: Error) {}
  // public onTranlationError(e: Error) {
  //   this.setState(
  //     (prevState: IState) => ({
  //       errorRetry: prevState.errorRetry + 1
  //     }),
  //     () => {
  //       if (this.state.errorRetry < 5) {
  //         this.load();
  //       }
  //     }
  //   );
  // }

  public onTranslationSuccess(word: string) {
    this.setState({
      errorRetry: 0
    });
  }

  public componentDidMount() {
    const { word } = this.state;
    if (word === null) {
      console.log("load from net");
      this.load();
    }
  }

  public render() {
    const { word, theme } = this.state;

    //
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
            <em
              className="description"
              dangerouslySetInnerHTML={{
                __html: word.description
              }}
            />
          </div>
          <ul className="settings">
            <li>
              <InfoButton onClick={this.info} />
            </li>
            {/* <li>
              <ReloadButton onClick={this.load} />
            </li> */}
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
