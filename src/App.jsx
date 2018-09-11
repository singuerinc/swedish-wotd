import { h, Component } from "preact";
import words from "./google-10000-english";
import { withTranslator } from "./WordTranslator";
import { Word } from "./Word";
import { ReloadButton } from "./ReloadButton";

const WordTranslator = withTranslator(Word);
const SmallWord = ({ word }) => <Word className="small" word={word} />;

const get = () => words[Math.floor(Math.random() * words.length)];

class App extends Component {
  componentDidMount() {
    this.setState({
      word: get()
    });
  }

  render() {
    const { word } = this.state;

    if (word) {
      return (
        <div className="container">
          <WordTranslator word={word} />
          <SmallWord word={word} />
          <ReloadButton
            onClick={() => {
              this.setState({
                word: get()
              });
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
