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
      return <WordTranslator word={this.state.word} />;
    } else {
      return null;
    }
  }
}

export { App };
