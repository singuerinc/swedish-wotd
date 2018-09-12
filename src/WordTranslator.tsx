import * as axios from "axios";
import * as React from "react";
import { IWord } from "./IWord";
import { LoadingIcon } from "./LoadingIcon";

const wordOrEmpty = (x: string): string =>
  x.def[0] ? x.def[0].tr[0].text : "";
// const pToJSON = x => x.replace(/^[^(]*\(([\S\s]+)\);?$/, "$1");
// const parse = JSON.parse;

const load = async (text: string) => {
  const lang = "en-sv";
  const key =
    "dict.1.1.20160812T233806Z.789b93880ae42c8b.b812e6901ba41a3b8307abddebbc324b7afb0707";

  const { data } = await axios.get(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=${lang}&text=${text}`
  );

  const res = wordOrEmpty(data);
  console.log(res);

  if (res === "") {
    throw new Error("There is no translation for this word.");
  }

  return res;
};

interface IProps {
  word: IWord;
  onError: (e: Error) => void;
  onSuccess: (word: string) => void;
}

interface IState {
  translated: string | null;
}

function withTranslator(WordComponent: React.ComponentClass<{ word: IWord }>) {
  return class WordTranslator extends React.Component<IProps, IState> {
    constructor(props: IProps) {
      super(props);
      this.state = {
        translated: null
      };
    }

    public async loadWord() {
      try {
        const word = await load(this.props.word.title);
        this.props.onSuccess(word);
        this.setState({
          translated: word
        });
      } catch (e) {
        this.props.onError(e);
        this.setState({
          translated: ""
        });
      }
    }

    public componentDidMount() {
      this.loadWord();
    }

    public componentDidUpdate(prevProps: IProps) {
      if (this.props.word !== prevProps.word) {
        this.setState({
          translated: null
        });

        this.loadWord();
      }
    }

    public render() {
      const { translated } = this.state;
      const isLoading = translated === null || translated === "";

      return (
        <>
          {isLoading && <LoadingIcon />}
          {!isLoading && <WordComponent word={{ title: translated }} />}
        </>
      );
    }
  };
}

export { withTranslator };
