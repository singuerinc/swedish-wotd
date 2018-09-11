import { h, Component } from "preact";

const wordOrEmpty = x => (x.def[0] ? x.def[0].tr[0].text : "");
const pToJSON = x => x.replace(/^[^(]*\(([\S\s]+)\);?$/, "$1");
const parse = JSON.parse;

const load = text => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      const { responseText } = xhr;
      const json = parse(pToJSON(responseText));
      resolve(wordOrEmpty(json));
    };

    const lang = "en-sv";
    const key =
      "dict.1.1.20160812T233806Z.789b93880ae42c8b.b812e6901ba41a3b8307abddebbc324b7afb0707";

    xhr.open(
      "GET",
      `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=${lang}&text=${text}`
    );
    xhr.send();
  });
};

function withTranslator(WordComponent) {
  return class WordTranslator extends Component {
    constructor() {
      super();
      this.state = {
        translated: null
      };
    }

    componentDidMount() {
      load(this.props.word).then(word => {
        this.setState({
          translated: word
        });
      });
    }

    componentDidUpdate(prevProps) {
      if (this.props.word !== prevProps.word) {
        load(this.props.word).then(word => {
          this.setState({
            translated: word
          });
        });
      }
    }

    render() {
      const { translated } = this.state;
      const isLoading = translated === null;
      const noTranslationAvailable = translated === "";

      if (noTranslationAvailable) {
        // ? icon
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-help-circle"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12" y2="17" />
          </svg>
        );
      } else if (translated) {
        return <WordComponent word={this.state.translated} />;
      } else if (isLoading) {
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-clock"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      }
    }
  };
}

export { withTranslator };
