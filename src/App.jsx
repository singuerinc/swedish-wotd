import { h, Component } from "preact";
import words from "./google-10000-english";
import { withTranslator } from "./WordTranslator";
import { Word } from "./Word";

const WordTranslator = withTranslator(Word);

const get = () => words[Math.floor(Math.random() * words.length)];

class App extends Component {
  componentDidMount() {
    this.setState({
      word: get()
    });
  }

  render() {
    const { word } = this.state;
    console.log(word);
    if (word) {
      return (
        <div>
          <WordTranslator word={word} />
          <Word className="small" word={word} />
        </div>
      );
    } else {
      return null;
    }
  }
}

export { App };
