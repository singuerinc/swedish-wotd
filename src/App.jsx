import * as React from "react";
import axios from "axios";
import { withTranslator } from "./WordTranslator";
import { Word } from "./Word";
import { ReloadButton } from "./ReloadButton";

const clean = x => /<strong>:<\/strong>(\D+)<strong>:<\/strong>/.exec(x)[1];
const WordTranslator = withTranslator(Word);
const SmallWord = ({ word }) => <Word className="small" word={word} />;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: null
    };
  }

  load() {
    axios.get(`/.netlify/functions/wotd`).then(({ data }) => {
      this.setState({
        word: data
      });
    });
  }

  componentDidMount() {
    this.load();
  }

  render() {
    const { word } = this.state;

    // <div dangerouslySetInnerHTML={{ __html: clean(word.description) }} />;
    // <a href={word.link}>{word.link}</a>

    if (word) {
      console.log(word);
      return (
        <div className="app-container">
          <div className="word-container">
            <WordTranslator word={word} />
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
