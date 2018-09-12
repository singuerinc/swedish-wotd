import * as React from "react";
import { IWord } from "./IWord";

interface IProps {
  word: IWord;
  className?: string;
}

const Word = ({ className, word }: IProps) => (
  <h1 className={className}>{word.title}</h1>
);

export { Word };
