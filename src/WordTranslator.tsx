import * as axios from "axios";
import * as React from "react";

const wordOrEmpty = x => (x.def[0] ? x.def[0].tr[0].text : "");
// const pToJSON = x => x.replace(/^[^(]*\(([\S\s]+)\);?$/, "$1");
// const parse = JSON.parse;

const load = async text => {
  const lang = "en-sv";
  const key =
    "dict.1.1.20160812T233806Z.789b93880ae42c8b.b812e6901ba41a3b8307abddebbc324b7afb0707";

  const { data } = await axios.get(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=${lang}&text=${text}`
  );

  const res = wordOrEmpty(data);
  console.log(res);
  return res;
};

function withTranslator(WordComponent) {
  return class WordTranslator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        translated: null
      };
    }

    public async componentDidMount() {
      const word = await load(this.props.word.title);
      this.setState({
        translated: word
      });
    }

    public async componentDidUpdate(prevProps) {
      if (this.props.word !== prevProps.word) {
        this.setState({
          translated: null
        });

        const word = await load(this.props.word.title);
        console.log(word);
        this.setState({
          translated: word
        });
      }
    }

    public render() {
      const { translated } = this.state;
      const isLoading = translated === null;
      const noTranslationAvailable = translated === "";
      const content = translated;

      if (noTranslationAvailable) {
        // ? icon
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12" y2="17" />
          </svg>
        );
      } else if (isLoading) {
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      }

      return <WordComponent word={translated} />;
    }
  };
}

export { withTranslator };
