import * as React from "react";
import { IWord } from "./IWord";

interface IProps {
  word: IWord;
  className?: string;
}

class Word extends React.Component<IProps> {
  public render() {
    return <h1 className={this.props.className}>{this.props.word.title}</h1>;
  }
}

export { Word };
